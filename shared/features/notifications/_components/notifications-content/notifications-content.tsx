import { useRouter } from "next/navigation";

import { NotificationReactQueryAdapter } from "@/core/application/react-query-adapter/notification";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

export function NotificationsContent({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    NotificationReactQueryAdapter.client.useGetNotifications({});

  const notifications = data?.pages.flatMap(page => page.notifications) || [];

  const { mutate: readAllNotifications, isPending: readAllNotificationsIsPending } =
    NotificationReactQueryAdapter.client.useReadAllNotifications({
      options: {
        onSuccess: () => {
          onClose();
        },
      },
    });

  const { mutateAsync: readNotifications } = NotificationReactQueryAdapter.client.useUpdateNotifications({});

  function handleReadAll() {
    readAllNotifications({});
  }

  async function handleRead(notificationId: string, url?: string) {
    await readNotifications({
      notifications: [{ id: notificationId, status: NotificationStatus.READ }],
    });

    onClose();

    if (url) {
      router.push(url);
    }
  }

  function renderContent() {
    if (isLoading) {
      return (
        <div className={"flex flex-col gap-lg"}>
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!notifications.length) {
      return <TypographyMuted className="text-center">No notifications</TypographyMuted>;
    }

    return (
      <ScrollArea>
        <div className="flex flex-col gap-lg">
          {notifications.map(notification =>
            notification ? (
              <Card
                key={notification.getId()}
                onClick={() => handleRead(notification.getId(), notification.getUrl())}
                className="flex cursor-pointer items-center pl-4 transition-opacity hover:opacity-80"
              >
                {notification.hasRead() ? null : (
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-background-brand-primary opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-background-brand-primary"></span>
                  </span>
                )}

                <CardHeader className="p-4">
                  <CardTitle>{notification.getTitle()}</CardTitle>
                  <CardDescription>{notification.getDescription()}</CardDescription>
                </CardHeader>
              </Card>
            ) : null
          )}

          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className={"flex h-full flex-col gap-3xl"}>
      <header className={"flex items-center justify-between"}>
        <TypographyH3>Notifications</TypographyH3>

        {notifications.length ? (
          <Button variant={"outline"} onClick={handleReadAll} disabled={readAllNotificationsIsPending}>
            Mark all as read
          </Button>
        ) : null}
      </header>

      {renderContent()}
    </div>
  );
}

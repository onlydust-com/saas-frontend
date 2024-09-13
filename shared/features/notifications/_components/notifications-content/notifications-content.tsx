import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import { NotificationReactQueryAdapter } from "@/core/application/react-query-adapter/notification";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { CardNotification, CardNotificationLoading } from "@/design-system/molecules/cards/card-notification";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NotificationsContentProps } from "@/shared/features/notifications/_components/notifications-content/notifications-content.types";

export function NotificationsContent({ onClose }: NotificationsContentProps) {
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
        <div className={"grid gap-lg"}>
          <CardNotificationLoading />
          <CardNotificationLoading />
          <CardNotificationLoading />
        </div>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!notifications.length) {
      return <EmptyStateLite message={"features:notifications.empty"} />;
    }

    return (
      <div className={"grid gap-lg"}>
        {notifications.map(notification => (
          <CardNotification
            key={notification.getId()}
            titleProps={{
              children: notification.getTitle(),
            }}
            descriptionProps={{
              children: notification.getDescription(),
            }}
            onClick={() => handleRead(notification.getId(), notification.getUrl())}
          />
        ))}

        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </div>
    );
  }

  return (
    <div className={"grid gap-3xl"}>
      <header className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-lg"}>
          <Typo
            variant={"heading"}
            size={"xs"}
            weight={"medium"}
            translate={{ token: "features:notifications.title" }}
          />

          {notifications.length ? (
            <Button
              variant={"secondary"}
              size={"xs"}
              translate={{
                token: "features:notifications.markAllAsRead",
              }}
              onClick={handleReadAll}
              isDisabled={readAllNotificationsIsPending}
            />
          ) : null}
        </div>

        <Button variant={"tertiary"} size={"sm"} iconOnly startIcon={{ component: X }} onClick={onClose} />
      </header>

      {renderContent()}
    </div>
  );
}

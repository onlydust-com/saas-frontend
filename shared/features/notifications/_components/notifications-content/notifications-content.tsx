import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { NotificationReactQueryAdapter } from "@/core/application/react-query-adapter/notification";
import { NotificationAction } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { useIsBreakpoint } from "@/shared/hooks/ui/use-is-breakpoint";
import { ContributionData } from "@/shared/survey/pull-request-survey/use-pull-request-survey";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

export function NotificationsContent({
  onClose,
  openSurvey,
}: {
  onClose: () => void;
  openSurvey: (contribution: ContributionData) => void;
}) {
  const isSmBreakpoint = useIsBreakpoint("sm");
  const { capture } = usePosthog();
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

  async function handleRead(notificationId: string, options: { url?: string; action?: NotificationAction }) {
    await readNotifications({
      notifications: [{ id: notificationId, status: NotificationStatus.READ }],
    });

    onClose();

    if (options.url) {
      router.push(options.url);
    }

    if (options.action) {
      if (options.action.type === "PULL_REQUEST_MERGED") {
        capture("pull_request_merged_notification_clicked");
        openSurvey({
          contributionId: options.action.contributionUuid,
          projectId: options.action.projectId,
          projectSlug: options.action.projectSlug,
          issueNumber: options.action.number,
          issueTitle: options.action.title,
        });
      }
    }
  }

  useEffect(() => {
    if (notifications.some(notification => notification?.getType() === "CONTRIBUTOR_PULL_REQUEST_MERGED")) {
      capture("has_pull_request_merged_notification");
    }
  }, [notifications]);

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
                onClick={() =>
                  handleRead(notification.getId(), { url: notification.getUrl(), action: notification.getAction?.() })
                }
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
          <Button
            variant={"outline"}
            size={isSmBreakpoint ? "default" : "icon"}
            onClick={handleReadAll}
            disabled={readAllNotificationsIsPending}
          >
            <CheckCheck className="sm:hidden" />
            <span className="hidden sm:block">Mark all as read</span>
          </Button>
        ) : null}
      </header>

      {renderContent()}
    </div>
  );
}

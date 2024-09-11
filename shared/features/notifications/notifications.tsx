import { X } from "lucide-react";

import { NotificationReactQueryAdapter } from "@/core/application/react-query-adapter/notification";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CardNotification, CardNotificationLoading } from "@/design-system/molecules/cards/card-notification";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NotificationsProps } from "@/shared/features/notifications/notifications.types";

export function Notifications({ onClose }: NotificationsProps) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    NotificationReactQueryAdapter.client.useGetNotifications({});

  const notifications = data?.pages.flatMap(page => page.notifications) || [];

  // const { mutateAsync: readNotifications } = NotificationReactQueryAdapter.client.useUpdateNotifications({});
  // const { mutateAsync: readAllNotifications } = NotificationReactQueryAdapter.client.useReadAllNotifications({});
  //
  // async function handleReadAll() {
  //   await readAllNotifications({});
  //   onClose();
  // }
  //
  // async function handleRead(notificationId: string, url?: string) {
  //   await readNotifications({
  //     notifications: [{ id: notificationId, status: NotificationStatus.READ }],
  //   });
  //
  //   onClose();
  //
  //   if (url) {
  //     router.push(url);
  //   }
  // }

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
      return <EmptyStateLite />;
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
            onClick={() =>
              // TODO handle click
              alert("test")
            }
          />
        ))}

        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </div>
    );
  }

  return (
    <Paper
      as={ScrollView}
      size={"3xl"}
      background={"primary-alt"}
      border={"primary"}
      classNames={{ base: "effect-box-shadow-xl grid gap-3xl w-full max-h-72" }}
    >
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
              // TODO handle click
            />
          ) : null}
        </div>

        <Button variant={"tertiary"} size={"sm"} iconOnly startIcon={{ component: X }} onClick={onClose} />
      </header>

      {renderContent()}
    </Paper>
  );
}

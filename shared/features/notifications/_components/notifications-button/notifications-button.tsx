import { Bell } from "lucide-react";

import { NotificationReactQueryAdapter } from "@/core/application/react-query-adapter/notification";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { NotificationsButtonProps } from "@/shared/features/notifications/_components/notifications-button/notifications-button.types";

export function NotificationsButton({ onClick }: NotificationsButtonProps) {
  const { data: unreadNotificationCount } = NotificationReactQueryAdapter.client.useGetNotificationsCount({
    queryParams: { status: NotificationStatus.UNREAD },
  });

  const hasUnreadNotifications = !!unreadNotificationCount?.count;

  return (
    <div className={"relative"}>
      <Button variant={"tertiary"} size={"xs"} startIcon={{ component: Bell }} iconOnly onClick={onClick} />
      {hasUnreadNotifications ? (
        <div
          className={
            "absolute right-0 top-0 size-1.5 -translate-y-1/4 translate-x-1/4 rounded-full bg-background-brand-primary"
          }
        />
      ) : null}
    </div>
  );
}

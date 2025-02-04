import { Bell } from "lucide-react";

import { NotificationReactQueryAdapter } from "@/core/application/react-query-adapter/notification";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";

import { buttonVariants } from "@/shared/ui/button";

export function NotificationsButton() {
  const { data: unreadNotificationCount } = NotificationReactQueryAdapter.client.useGetNotificationsCount({
    queryParams: { status: NotificationStatus.UNREAD },
  });

  const hasUnreadNotifications = !!unreadNotificationCount?.count;

  return (
    <div className={buttonVariants({ variant: "outline", size: "icon" })}>
      <Bell />

      {hasUnreadNotifications ? (
        <span className="absolute right-0 top-0 flex size-2 -translate-y-1/4 translate-x-1/4">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-background-brand-primary opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-background-brand-primary"></span>
        </span>
      ) : null}
    </div>
  );
}

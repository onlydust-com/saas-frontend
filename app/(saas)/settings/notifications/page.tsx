"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function NotificationsPage() {
  return (
    <div>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "notifications",
            label: "Notifications",
          },
        ]}
      />
      Notifications
    </div>
  );
}

export default withClientOnly(withAuthenticated(NotificationsPage));

"use client";

import { NotificationsForm } from "@/app/(saas)/settings/notifications/_features/notifications-form/notifications-form";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function NotificationsPage() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
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

      <NotificationsForm />
    </div>
  );
}

export default withClientOnly(withAuthenticated(NotificationsPage));

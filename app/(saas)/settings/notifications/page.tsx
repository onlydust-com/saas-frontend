"use client";

import { SettingsHeader } from "@/app/(saas)/settings/_features/settings-header/settings-header";
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

      <SettingsHeader
        title="Notification Preferences"
        description="Customize your notification settings to stay informed about important updates."
      />

      <NotificationsForm />
    </div>
  );
}

export default withClientOnly(withAuthenticated(NotificationsPage));

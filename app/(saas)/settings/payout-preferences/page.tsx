"use client";

import { CircleAlert } from "lucide-react";

import { SettingsHeader } from "@/app/(saas)/settings/_features/settings-header/settings-header";
import { LimitReachedHeader } from "@/app/(saas)/settings/billing-profiles/[id]/_features/limit-reached-header/limit-reached-header";
import { PayoutPreferencesTable } from "@/app/(saas)/settings/payout-preferences/_features/payout-preferences-table/payout-preferences-table";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Alert, AlertDescription } from "@/shared/ui/alert";

function PayoutPreferencesPage() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "payout-preferences",
            label: "Payout Preferences",
          },
        ]}
      />

      <LimitReachedHeader />

      <SettingsHeader
        title="Payout preferences"
        description="Connect your billing profile to the projects you contribute to for receiving rewards."
      />

      <PayoutPreferencesTable />

      <Alert>
        <div className="flex items-center gap-2">
          <CircleAlert className="h-4 w-4 shrink-0" />
          <AlertDescription>
            Only projects for which you have already received rewards will appear here.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}

export default withClientOnly(withAuthenticated(PayoutPreferencesPage));

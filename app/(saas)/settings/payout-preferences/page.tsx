"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function PayoutPreferencesPage() {
  return (
    <div>
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
      Payout Preferences
    </div>
  );
}

export default withClientOnly(withAuthenticated(PayoutPreferencesPage));

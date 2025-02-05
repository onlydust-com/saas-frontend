"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfileCoworkersPage() {
  return (
    <div>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "billing-profiles",
            label: "Billing Profiles",
            href: NEXT_ROUTER.settings.billingProfiles.root,
          },
          {
            id: "coworkers",
            label: "Coworkers",
          },
        ]}
      />
      Billing Profile Coworkers
    </div>
  );
}

export default withClientOnly(withAuthenticated(BillingProfileCoworkersPage));

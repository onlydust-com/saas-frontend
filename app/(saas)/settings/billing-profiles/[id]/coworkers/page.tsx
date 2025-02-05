"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { CoworkersTable } from "./_features/coworkers-table/coworkers-table";
import { InviteCoworker } from "./_features/invite-coworker/invite-coworker";

function BillingProfileCoworkersPage({ params }: { params: { id: string } }) {
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
      <InviteCoworker id={params.id} />
      <CoworkersTable id={params.id} />
    </div>
  );
}

// TODO @Billing add withBillingProfileAdminGuard
export default withClientOnly(withAuthenticated(BillingProfileCoworkersPage));

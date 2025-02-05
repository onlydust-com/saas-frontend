"use client";

import { ProfileStatus } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_features/profile-status/profile-status";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfileGeneralInformationPage({ params }: { params: { id: string } }) {
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
            id: "general-information",
            label: "General Information",
          },
        ]}
      />

      <ProfileStatus id={params.id} />
    </div>
  );
}

export default withClientOnly(withAuthenticated(BillingProfileGeneralInformationPage));

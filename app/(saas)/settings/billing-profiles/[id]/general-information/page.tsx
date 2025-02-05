"use client";

import { DisabledBillingProfile } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_features/disabled-billing-profile/disabled-billing-profile";
import { LeaveBillingProfile } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_features/leave-billing-profile/leave-billing-profile";
import { ManageBillingProfile } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_features/manage-profile/manage-profile";
import { ProfileBanner } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_features/profile-banner/profile-banner";
import { ProfileCompany } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_features/profile-company/profile-company";
import { ProfileIndividual } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_features/profile-individual/profile-individual";
import { ProfileStatus } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_features/profile-status/profile-status";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfileGeneralInformationPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-4">
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

      <div>
        <ProfileStatus id={params.id} />
      </div>

      <ProfileIndividual id={params.id} />
      <ProfileCompany id={params.id} />

      <footer className="flex flex-col gap-4">
        <ProfileBanner id={params.id} />

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <DisabledBillingProfile id={params.id} />
          </div>

          <div className="flex justify-end gap-2">
            <ManageBillingProfile id={params.id} />
            <LeaveBillingProfile id={params.id} />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default withClientOnly(withAuthenticated(BillingProfileGeneralInformationPage));

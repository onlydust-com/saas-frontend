import { enGB } from "date-fns/locale";
import { useMemo } from "react";

import { ProfileItem } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_components/profile-item/profile-item";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { bootstrap } from "@/core/bootstrap";

export function ProfileCompany({ id }: { id: string }) {
  const dateKernel = bootstrap.getDateKernelPort();

  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  const profile = data?.kyb;

  const registrationDate = useMemo(() => {
    if (profile?.registrationDate) {
      // we fix the timezone issue by using the formatInTimeZone function
      // this is a temporary solution to handle the date provided by SUMSUB
      return dateKernel.formatInTimeZone(new Date(profile.registrationDate), "Europe/Paris", "MMM dd, yyyy", {
        locale: enGB,
      });
    }

    return profile?.registrationDate;
  }, [profile]);

  if (!profile) return null;

  return (
    <dl className="divide-y divide-border border-t border-border">
      <ProfileItem label="Company name" value={profile.name} />
      <ProfileItem label="Registration number" value={profile.registrationNumber} />
      <ProfileItem label="Registration date" value={registrationDate} />
      <ProfileItem label="Address" value={profile.address} />
      <ProfileItem label="Country" value={profile.country} />
      <ProfileItem label="US Entity" value={profile.usEntity ? "Yes" : "No"} />
      <ProfileItem label="Subject to VAT in Europe" value={profile.subjectToEuropeVAT ? "Yes" : "No"} />
      {profile.euVATNumber ? <ProfileItem label="EU VAT number" value={profile.euVATNumber} /> : null}
    </dl>
  );
}

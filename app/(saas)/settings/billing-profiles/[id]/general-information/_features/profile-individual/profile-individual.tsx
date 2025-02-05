import { enGB } from "date-fns/locale";
import { useMemo } from "react";

import { ProfileItem } from "@/app/(saas)/settings/billing-profiles/[id]/general-information/_components/profile-item/profile-item";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { bootstrap } from "@/core/bootstrap";

const idDocumentTypeMapping = {
  DRIVER_LICENSE: "Driver license",
  ID_CARD: "Id card",
  PASSPORT: "Passport",
  RESIDENCE_PERMIT: "Residence permit",
};

export function ProfileIndividual({ id }: { id: string }) {
  const dateKernel = bootstrap.getDateKernelPort();

  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  const profile = data?.kyc;

  const birthdate = useMemo(() => {
    if (profile?.birthdate) {
      // we fix the timezone issue by using the formatInTimeZone function
      // this is a hack to handle the date provided by SUMSUB
      return dateKernel.formatInTimeZone(new Date(profile.birthdate), "Europe/Paris", "MMM dd, yyyy", { locale: enGB });
    }

    return undefined;
  }, [profile]);

  const validUntil = useMemo(() => {
    if (profile?.validUntil) {
      // we fix the timezone issue by using the formatInTimeZone function
      // this is a temporary solution to handle the date provided by SUMSUB
      return dateKernel.formatInTimeZone(new Date(profile.validUntil), "Europe/Paris", "MMM dd, yyyy", {
        locale: enGB,
      });
    }

    return undefined;
  }, [profile]);

  if (!profile) return null;

  return (
    <dl className="divide-y divide-border">
      <ProfileItem label="First name" value={profile.firstName} />
      <ProfileItem label="Last name" value={profile.lastName} />
      <ProfileItem label="Birthdate" value={birthdate} />
      <ProfileItem label="Address" value={profile.address} />
      <ProfileItem label="Country" value={profile.country} />
      <ProfileItem label="US Citizen" value={profile.usCitizen ? "Yes" : "No"} />
      <ProfileItem
        label="Identity document type"
        value={
          profile?.idDocumentType
            ? `${idDocumentTypeMapping[profile.idDocumentType]}${
                profile.idDocumentCountryCode ? ` (${profile.idDocumentCountryCode.toUpperCase()})` : ""
              }`
            : undefined
        }
      />
      <ProfileItem label="Valid until" value={validUntil} />
    </dl>
  );
}

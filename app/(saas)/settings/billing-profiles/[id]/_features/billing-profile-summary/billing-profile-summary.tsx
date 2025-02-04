import { useCallback } from "react";

import { InvitedBy } from "@/app/(saas)/settings/billing-profiles/[id]/_features/invited-by/invited-by";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { CardDescription, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

export function BillingProfileSummary({ id }: { id: string }) {
  const { data, isLoading, isError } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  const renderDescription = useCallback(() => {
    if (!data) return "";

    if (data.isBillingProfileIndividual()) {
      return "As an individual, when you reach the annual reward amount limited by your tax residency you'll need to create a dedicated entity.";
    }

    if (data.isBillingProfileCompany()) {
      return "As an organisation, you are responsible for your statements in your country of residence, and for your coworkers.";
    }

    if (data.isBillingProfileSelfEmployed()) {
      return "Being self-employed, you are responsible for your statements in your country of residence.";
    }
  }, [data]);

  const renderAside = useCallback(() => {
    if (!data) return null;

    if (data.isInvited() && !data.isAdmin()) {
      return (
        <InvitedBy login={data.me.invitation?.invitedBy?.login} avatarUrl={data.me.invitation?.invitedBy?.avatarUrl} />
      );
    }

    if (data.isBillingProfileIndividual()) {
      // return (
      //   <IndividualProgression
      // 	amount={shortBillingProfile?.currentYearPaymentAmount}
      // 	limit={shortBillingProfile?.currentYearPaymentLimit}
      //   />
      // );
    }

    if (data.isAdmin()) {
      // 	return (
      // 	  <AdminContentWrapper role={role}>
      // 	  <TeamworkMode
      // 		type={profile?.data.type}
      // 		isSwitchableToSelfEmployed={profile?.data.isSwitchableToSelfEmployed}
      // 		id={id}
      // 	  />
      // 	</AdminContentWrapper>
      //   );

      return null;
    }
  }, [data]);

  if (isLoading) {
    return <Skeleton className="h-[58px]" />;
  }

  if (isError) {
    return <TypographyMuted>Failed to load billing profile</TypographyMuted>;
  }

  if (!data) {
    return <TypographyMuted>Billing profile not found</TypographyMuted>;
  }

  return (
    <CardHeader className="flex flex-row items-start justify-between p-0">
      <div>
        <div className="flex items-baseline gap-2">
          <TypographyH3>{data.name}</TypographyH3>
          <TypographyMuted>{data.getTypeLabel()}</TypographyMuted>
        </div>
        <CardDescription>{renderDescription()}</CardDescription>
      </div>

      {renderAside()}
    </CardHeader>
  );
}

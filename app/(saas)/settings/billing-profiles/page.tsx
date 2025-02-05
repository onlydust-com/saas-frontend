"use client";

import { CircleAlert, Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import { CreateBillingProfile } from "@/app/(saas)/settings/billing-profiles/_features/create-billing-profile/create-billing-profile";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { BillingProfileShortInterface } from "@/core/domain/billing-profile/models/billing-profile-short-model";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Card, CardContent, CardDescription, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

function BillingProfileCard({ profile }: { profile: BillingProfileShortInterface }) {
  const warning = profile.getWarning();
  const error = profile.getError();

  const renderWarning = useCallback(() => {
    if (!warning) return null;

    return (
      <TypographySmall className="flex items-center gap-2 text-orange-500">
        <CircleAlert className="inline-flex size-4" /> {warning}
      </TypographySmall>
    );
  }, [warning]);

  const renderError = useCallback(() => {
    if (!error) return null;

    return (
      <TypographySmall className="flex items-center gap-2 text-red-500">
        <CircleAlert className="inline-flex size-4" /> {error}
      </TypographySmall>
    );
  }, [error]);

  return (
    <Link
      href={NEXT_ROUTER.settings.billingProfiles.generalInformation.root(profile.id)}
      className="transition-opacity hover:opacity-80"
    >
      <Card>
        <CardHeader>
          <TypographyH4>{profile.name}</TypographyH4>
          <CardDescription>{profile.getTypeLabel()}</CardDescription>
        </CardHeader>

        {warning || error ? (
          <CardContent>
            {renderWarning()}
            {renderError()}
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}

function BillingProfilesPage() {
  const { data, isLoading, isError } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({});
  const myBillingProfiles = useMemo(() => data?.billingProfiles ?? [], [data]);

  const renderBillingProfiles = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-[132px]" />);
    }

    if (isError) {
      return (
        <div className="col-span-full text-center">
          <TypographyMuted>An error occurred</TypographyMuted>
        </div>
      );
    }

    return myBillingProfiles.map(profile => <BillingProfileCard key={profile.id} profile={profile} />);
  }, [myBillingProfiles]);

  return (
    <div className="p-4">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "billing-profiles",
            label: "Billing Profiles",
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateBillingProfile>
          <Card className="cursor-pointer border-dashed transition-opacity hover:opacity-80">
            <CardHeader className="flex h-full items-center justify-center">
              <div className="flex items-center gap-2">
                <Plus className="size-8" />
                <TypographyH4 className="text-center">Create Billing Profile</TypographyH4>
              </div>
            </CardHeader>
          </Card>
        </CreateBillingProfile>

        {renderBillingProfiles()}
      </div>
    </div>
  );
}

export default withClientOnly(withAuthenticated(BillingProfilesPage));

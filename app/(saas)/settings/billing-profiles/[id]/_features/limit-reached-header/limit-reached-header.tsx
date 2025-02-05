"use client";

import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

// import { useStackBillingCreate } from "src/App/Stacks/Stacks";
import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { BillingProfileShortInterface } from "@/core/domain/billing-profile/models/billing-profile-short-model";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";

interface ProfileWithLimitReached {
  type: "payout-preferences" | "individual";
  instance: BillingProfileShortInterface;
}

export function LimitReachedHeader() {
  const pathname = usePathname();
  //   const [openBillingCreate] = useStackBillingCreate();

  const { data } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({});
  const profiles = useMemo(() => data?.billingProfiles ?? [], [data]);

  const { data: payoutPreferences } = MeReactQueryAdapter.client.useGetMyPayoutPreferences({});

  function handleCreateBillingProfile() {
    // TODO @billing
    // openBillingCreate({ redirectToProfile: true });
  }

  function findPayoutPreference(): ProfileWithLimitReached | undefined {
    const findInPayoutPreference = payoutPreferences
      ?.map(p => p?.billingProfile)
      .find(p => p?.isIndividualLimitReached());

    if (findInPayoutPreference) {
      return {
        type: "payout-preferences",
        instance: findInPayoutPreference,
      };
    }

    return undefined;
  }

  function findIndividualProfile(): ProfileWithLimitReached | undefined {
    if (profiles.length === 1 && profiles[0].type === "INDIVIDUAL") {
      if (profiles[0].isIndividualLimitReached()) {
        return {
          type: "individual",
          instance: profiles[0],
        };
      }
    }

    return undefined;
  }

  const profileWithLimitReached: ProfileWithLimitReached | undefined =
    findPayoutPreference() || findIndividualProfile();

  const renderAlertContent = useCallback(() => {
    if (pathname.includes("payout-preferences")) {
      return (
        <AlertDescription>
          Please update your payout preferences to another billing profile (self-employed or organisation) to receive
          new rewards.
        </AlertDescription>
      );
    }

    if (profileWithLimitReached?.type === "individual") {
      return (
        <div className="flex flex-col gap-2">
          <AlertDescription>
            Please add a new billing profile (self-employed or organisation) to receive new rewards.
          </AlertDescription>

          <Button size="sm" onClick={handleCreateBillingProfile} variant="destructive" className="w-fit">
            Add new billing profile
          </Button>
        </div>
      );
    }

    if (profileWithLimitReached?.type === "payout-preferences") {
      return (
        <div className="flex flex-col gap-2">
          <AlertDescription>
            Please switch your payout preferences to another billing profile (self-employed or organisation) to receive
            new rewards.
          </AlertDescription>

          <Button size="sm" asChild variant="destructive" className="w-fit">
            <Link href={NEXT_ROUTER.settings.payoutPreferences.root}>Update payout preferences</Link>
          </Button>
        </div>
      );
    }
  }, [pathname, profileWithLimitReached]);

  if (profileWithLimitReached) {
    return (
      <Alert variant="destructive">
        <CircleAlert className="h-4 w-4" />

        <AlertTitle>
          Some of your pending rewards have been blocked because they will cause you to exceed the annual reward amount
          limited by your tax residency.
        </AlertTitle>

        {renderAlertContent()}
      </Alert>
    );
  }

  return null;
}

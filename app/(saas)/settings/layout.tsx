"use client";

import Link from "next/link";
import { ReactNode, useMemo } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export enum SettingViews {
  "PROFILE" = "profile",
  "NOTIFICATIONS" = "notifications",
  "PAYOUT_PREFERENCES" = "payout-preferences",
  "BILLING_PROFILES" = "billing-profiles",
  "TERMS_AND_CONDITIONS" = "terms-and-conditions",
}

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const isProfile = useMatchPath(NEXT_ROUTER.settings.profile.root);
  const isNotifications = useMatchPath(NEXT_ROUTER.settings.notifications.root);
  const isPayoutPreferences = useMatchPath(NEXT_ROUTER.settings.payoutPreferences.root);
  const isBillingProfiles = useMatchPath(NEXT_ROUTER.settings.billingProfiles.root);
  const isTerms = useMatchPath(NEXT_ROUTER.settings.termsAndConditions.root);

  const currentTab = useMemo(() => {
    if (isProfile) return SettingViews.PROFILE;
    if (isNotifications) return SettingViews.NOTIFICATIONS;
    if (isPayoutPreferences) return SettingViews.PAYOUT_PREFERENCES;
    if (isBillingProfiles) return SettingViews.BILLING_PROFILES;
    if (isTerms) return SettingViews.TERMS_AND_CONDITIONS;

    return SettingViews.PROFILE;
  }, [isProfile, isNotifications, isPayoutPreferences, isBillingProfiles, isTerms]);

  return (
    <PageWrapper containerSize="small">
      <Tabs defaultValue={SettingViews.PROFILE} value={currentTab} className="w-full">
        <TabsList className="w-full grid-cols-4">
          <TabsTrigger value={SettingViews.PROFILE} asChild>
            <Link href={NEXT_ROUTER.settings.profile.root}>Profile</Link>
          </TabsTrigger>
          <TabsTrigger value={SettingViews.NOTIFICATIONS} asChild>
            <Link href={NEXT_ROUTER.settings.notifications.root}>Notifications</Link>
          </TabsTrigger>
          <TabsTrigger value={SettingViews.PAYOUT_PREFERENCES} asChild>
            <Link href={NEXT_ROUTER.settings.payoutPreferences.root}>Payout Preferences</Link>
          </TabsTrigger>
          <TabsTrigger value={SettingViews.BILLING_PROFILES} asChild>
            <Link href={NEXT_ROUTER.settings.billingProfiles.root}>Billing Profiles</Link>
          </TabsTrigger>
          <TabsTrigger value={SettingViews.TERMS_AND_CONDITIONS}>Terms and Conditions</TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </PageWrapper>
  );
}

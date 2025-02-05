"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useMemo } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { Card } from "@/shared/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const SETTING_ROUTES = [
  { href: NEXT_ROUTER.settings.profile.root, label: "Profile" },
  { href: NEXT_ROUTER.settings.notifications.root, label: "Notifications" },
  { href: NEXT_ROUTER.settings.payoutPreferences.root, label: "Payout Preferences" },
  { href: NEXT_ROUTER.settings.billingProfiles.root, label: "Billing Profiles" },
  { href: NEXT_ROUTER.settings.termsAndConditions.root, label: "Terms and Conditions" },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  const currentPath = usePathname();

  const value = useMemo(() => {
    // Maximum number of URL segments for a parent settings route (e.g. /settings/billing-profiles)
    const MAX_SEGMENTS = 3;

    // Split current path into segments (e.g. ['', 'settings', 'billing-profiles', '123'])
    const currentPathSegments = currentPath.split("/");

    // For nested routes like /settings/billing-profiles/123, truncate to parent path
    // to keep the parent tab active
    if (currentPathSegments.length > MAX_SEGMENTS) {
      const segmentDiff = currentPathSegments.length - MAX_SEGMENTS;
      return currentPathSegments.slice(0, -segmentDiff).join("/");
    }

    return currentPath;
  }, [currentPath]);

  return (
    <PageContainer>
      <Tabs defaultValue={NEXT_ROUTER.settings.profile.root} value={value} className="flex w-full flex-col gap-4 py-4">
        <TabsList className="h-auto w-fit flex-wrap justify-start">
          {SETTING_ROUTES.map(({ href, label }) => (
            <TabsTrigger key={href} value={href}>
              <Link href={href}>{label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>

        <Card>{children}</Card>
      </Tabs>
    </PageContainer>
  );
}

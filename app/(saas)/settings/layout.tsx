"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const currentPath = usePathname();

  return (
    <PageContainer>
      <Tabs
        defaultValue={NEXT_ROUTER.settings.profile.root}
        value={currentPath}
        className="flex w-full flex-col gap-4 py-4"
      >
        <TabsList className="w-fit grid-cols-4">
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

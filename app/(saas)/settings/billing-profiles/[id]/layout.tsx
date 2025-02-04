"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import { BillingProfileSummary } from "@/app/(saas)/settings/billing-profiles/[id]/_features/billing-profile-summary/billing-profile-summary";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Card } from "@/shared/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function BillingProfileLayout({ params, children }: PropsWithChildren<{ params: { id: string } }>) {
  const { id } = params;
  const currentPath = usePathname();

  const tabs = [
    { href: NEXT_ROUTER.settings.billingProfiles.generalInformation.root(id), label: "General Information" },
    { href: NEXT_ROUTER.settings.billingProfiles.paymentMethods.root(id), label: "Payment Methods" },
    { href: NEXT_ROUTER.settings.billingProfiles.coworkers.root(id), label: "Coworkers" },
    { href: NEXT_ROUTER.settings.billingProfiles.invoices.root(id), label: "Invoices" },
  ];

  return (
    <Tabs
      defaultValue={NEXT_ROUTER.settings.billingProfiles.generalInformation.root(id)}
      value={currentPath}
      className="flex w-full flex-col gap-4 p-4"
    >
      <BillingProfileSummary id={id} />

      <TabsList className="h-auto w-fit flex-wrap justify-start">
        {tabs.map(({ href, label }) => (
          <TabsTrigger key={href} value={href}>
            <Link href={href}>{label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>

      <Card className="p-4">{children}</Card>
    </Tabs>
  );
}

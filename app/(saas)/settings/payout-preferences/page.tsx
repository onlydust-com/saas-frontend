"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { CardDescription, CardHeader } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

function PayoutPreferencesPage() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "payout-preferences",
            label: "Payout Preferences",
          },
        ]}
      />

      <CardHeader className="p-0">
        <TypographyH3>Payout preferences</TypographyH3>
        <CardDescription>
          Connect your billing profile to the projects you contribute to for receiving rewards.
        </CardDescription>
      </CardHeader>
    </div>
  );
}

export default withClientOnly(withAuthenticated(PayoutPreferencesPage));

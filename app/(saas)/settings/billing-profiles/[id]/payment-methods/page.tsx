"use client";

import { withBillingProfileAdminGuard } from "@/app/(saas)/settings/billing-profiles/_features/billing-profile-admln-guard/billing-profile-admln-guard";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { PaymentMethodForm } from "./_features/form/form";

function BillingProfilePaymentMethodsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "billing-profiles",
            label: "Billing Profiles",
            href: NEXT_ROUTER.settings.billingProfiles.root,
          },
          {
            id: "payment-methods",
            label: "Payment Methods",
          },
        ]}
      />

      <PaymentMethodForm id={params.id} />
    </div>
  );
}

export default withClientOnly(withAuthenticated(withBillingProfileAdminGuard(BillingProfilePaymentMethodsPage)));

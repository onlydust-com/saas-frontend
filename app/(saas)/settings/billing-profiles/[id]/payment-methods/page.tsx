"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfilePaymentMethodsPage() {
  return <div>Billing Profile Payment Methods</div>;
}

export default withClientOnly(withAuthenticated(BillingProfilePaymentMethodsPage));

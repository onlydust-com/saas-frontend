"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfileInvoicesPage() {
  return <div>Billing Profile Invoices</div>;
}

export default withClientOnly(withAuthenticated(BillingProfileInvoicesPage));

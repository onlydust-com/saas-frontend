"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfileCoworkersPage() {
  return <div>Billing Profile Coworkers</div>;
}

export default withClientOnly(withAuthenticated(BillingProfileCoworkersPage));

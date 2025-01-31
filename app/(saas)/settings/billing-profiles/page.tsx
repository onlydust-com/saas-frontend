"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfilesPage() {
  return <div>Billing Profiles</div>;
}

export default withClientOnly(withAuthenticated(BillingProfilesPage));

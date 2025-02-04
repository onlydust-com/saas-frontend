"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfileGeneralInformationPage() {
  return <div>Billing Profile General Information</div>;
}

export default withClientOnly(withAuthenticated(BillingProfileGeneralInformationPage));

"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function TermsAndConditionsPage() {
  return <div>Terms and Conditions</div>;
}

export default withClientOnly(withAuthenticated(TermsAndConditionsPage));

"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function PayoutPreferencesPage() {
  return <div>Payout Preferences</div>;
}

export default withClientOnly(withAuthenticated(PayoutPreferencesPage));

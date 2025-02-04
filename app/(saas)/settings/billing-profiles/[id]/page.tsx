"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

interface BillingProfilePageProps {
  params: {
    id: string;
  };
}

function BillingProfilePage({ params }: BillingProfilePageProps) {
  return <div>Billing Profile slug: {params.id}</div>;
}

export default withClientOnly(withAuthenticated(BillingProfilePage));

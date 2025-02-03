"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

interface BillingProfilePageProps {
  params: {
    slug: string;
  };
}

function BillingProfilePage({ params }: BillingProfilePageProps) {
  return <div>Billing Profile slug: {params.slug}</div>;
}

export default withClientOnly(withAuthenticated(BillingProfilePage));

"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { withClientOnly } from "@/shared/components/client-only/client-only";

function DataOverviewPage() {
  return <div>Overview</div>;
}

export default withClientOnly(withAuthenticationRequired(DataOverviewPage));

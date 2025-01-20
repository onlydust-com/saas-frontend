"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { withClientOnly } from "@/shared/components/client-only/client-only";

import { CommunityTable } from "./_components/community-table/community-table";

function EcosystemCommunityPage({ params }: { params: { ecosystemSlug: string } }) {
  return (
    <div className="pv-lg flex-1">
      <CommunityTable ecosystemSlug={params.ecosystemSlug} />
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(EcosystemCommunityPage));

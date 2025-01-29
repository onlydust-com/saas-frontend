"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { CommunityTable } from "./_components/community-table/community-table";

function EcosystemCommunityPage({ params }: { params: { ecosystemSlug: string } }) {
  return (
    <div className="flex-1">
      <CommunityTable ecosystemSlug={params.ecosystemSlug} />
    </div>
  );
}

export default withClientOnly(withAuthenticated(EcosystemCommunityPage));

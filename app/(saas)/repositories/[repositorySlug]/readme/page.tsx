"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function RepositoryReadmePage() {
  return (
    <div className="flex-1 p-lg">
      <h1>Repository README</h1>
    </div>
  );
}

export default withClientOnly(withAuthenticated(RepositoryReadmePage));

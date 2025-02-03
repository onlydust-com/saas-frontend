"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function RepositoryIssuesPage() {
  return (
    <div className="flex-1 p-lg">
      <h1>Repository Issues</h1>
    </div>
  );
}

export default withClientOnly(withAuthenticated(RepositoryIssuesPage));

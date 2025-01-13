import { withAuthenticationRequired } from "@auth0/auth0-react";

import { withClientOnly } from "@/shared/components/client-only/client-only";

function EcosystemOverviewPage() {
  return (
    <div className="flex-1 p-lg">
      <h1>Overview</h1>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(EcosystemOverviewPage));

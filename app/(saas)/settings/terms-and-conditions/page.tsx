"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function TermsAndConditionsPage() {
  return (
    <div>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "terms-and-conditions",
            label: "Terms and Conditions",
          },
        ]}
      />
      Terms and Conditions
    </div>
  );
}

export default withClientOnly(withAuthenticated(TermsAndConditionsPage));

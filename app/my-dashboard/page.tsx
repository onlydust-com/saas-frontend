"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

function MyDashboardPage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"myDashboard:detail.header.title"} />,
          },
        ],
      }}
    >
      CHILDREN
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(MyDashboardPage));

"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { DataSection } from "@/app/data/_sections/data-section/data-section";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

function DataPage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"data:details.header.title"} />,
          },
        ],
      }}
    >
      <ScrollView>
        <PageContent>
          <div className="grid h-full gap-3">
            <DataSection />
          </div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(DataPage));

"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { HistogramSection } from "@/app/data/_sections/histogram-section/histograms-section";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

function DataPage() {
  return (
    <PageWrapper
      navigation={{
        title: <Translate token={"data:details.header.title"} />,
      }}
    >
      <ScrollView>
        <PageContent>
          <div className="grid h-full gap-3">
            <HistogramSection />
          </div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(DataPage));

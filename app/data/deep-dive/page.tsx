"use client";

import { DeepDiveSection } from "@/app/data/deep-dive/_sections/deep-dive-section";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function DeepDivePage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "data",
            label: <Translate token={"data:deepDive.breadcrumbs.data"} />,
            href: NEXT_ROUTER.data.root,
          },
          {
            id: "deepDive",
            label: <Translate token={"data:deepDive.breadcrumbs.deepDive"} />,
          },
        ],
      }}
    >
      <ScrollView>
        <PageContent>
          <DeepDiveSection />
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

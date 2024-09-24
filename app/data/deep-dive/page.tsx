"use client";

import { DeepDiveSection } from "@/app/data/deep-dive/_sections/deep-dive-section";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ExportContributorsSidepanel } from "@/shared/panels/export-contributors-sidepanel/export-contributors-sidepanel";
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
      <AnimatedColumn className="flex h-full flex-1 flex-col gap-md overflow-auto">
        <ScrollView>
          <PageContent>
            <DeepDiveSection />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <ExportContributorsSidepanel />
    </PageWrapper>
  );
}

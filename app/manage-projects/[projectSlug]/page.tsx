"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { Translate } from "@/shared/translation/components/translate/translate";

function MaintainerSinglePage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"manageProjects:list.header.title"} />,
            href: NEXT_ROUTER.manageProjects.root,
          },
          {
            id: "details",
            label: "PROJECT NAME",
          },
        ],
      }}
    >
      <AnimatedColumn className="flex h-full flex-1 flex-col gap-md overflow-auto">
        <ScrollView>
          <PageContent>
            <div>content</div>
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
      <ContributorSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(MaintainerSinglePage));

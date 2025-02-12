"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import Chat from "./_features/chat/chat";

function ODSay() {
  return (
    <PageContainer size="large" className="flex-1">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "OD-Say",
          },
        ]}
      />
      <PageContent classNames={{ base: "flex h-full overflow-auto w-full flex flex-col items-center" }}>
        <Chat />
      </PageContent>
      <ContributionsSidepanel />
      <ProjectSidepanel />
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(ODSay));

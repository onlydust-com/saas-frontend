"use client";

import { useLayoutEffect } from "react";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import Chat from "./_features/chat/chat";

function ODSay() {
  useLayoutEffect(() => {
    document.querySelector(".page-container")?.classList.remove("pb-20");

    return () => {
      document.querySelector(".page-container")?.classList.add("pb-20");
    };
  }, []);

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
      <Chat />
      <ContributionsSidepanel />
      <ProjectSidepanel />
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(ODSay));

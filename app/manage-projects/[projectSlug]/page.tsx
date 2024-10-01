"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ContributorsTable } from "@/app/manage-projects/[projectSlug]/features/contributors-table/contributors-table";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { ProjectUpdateSidepanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

function UpdateProjectSandbox() {
  const { open } = useProjectUpdateSidePanel();
  const projectId1 = "7d04163c-4187-4313-8066-61504d34fc56";
  const projectId2 = "9b984978-a322-49ea-a93a-498d5992cb8b";
  return (
    <>
      <Button variant={"secondary"} onClick={() => open({ projectId: projectId1 })}>
        Open Update project
      </Button>
      <Button variant={"secondary"} onClick={() => open({ projectId: projectId2 })}>
        Open Update project 2
      </Button>
    </>
  );
}

function ManageProjectsSinglePage() {
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
            <ContributorsTable />
            <UpdateProjectSandbox />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
      <ContributorSidepanel />
      <ProjectUpdateSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(ManageProjectsSinglePage));

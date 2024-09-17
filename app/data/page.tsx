"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ActiveUsersSection } from "@/app/data/_sections/active-users-section/active-users-section";
import { DataSection } from "@/app/data/_sections/data-section/data-section";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { useProjectSidePanel } from "@/shared/panels/project-sidepanel/project-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

function Sandbox() {
  const { open } = useContributorSidePanel();
  const { open: openProject } = useProjectSidePanel();
  return (
    <>
      <Button isTextButton={true} onClick={() => open({ githubId: 17259618 })}>
        Open User (githubId)
      </Button>
      <Button isTextButton={true} onClick={() => open({ login: "alexbeno" })}>
        Open User (login)
      </Button>
      <Button isTextButton={true} onClick={() => openProject({ projectId: "a0c91aee-9770-4000-a893-953ddcbd62a7" })}>
        Open project
      </Button>
    </>
  );
}

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
      <AnimatedColumn className="flex h-full flex-1 flex-col gap-md overflow-auto">
        <ScrollView className="flex flex-col gap-4">
          <PageContent>
            <div className="grid h-full gap-3">
              <DataSection />
          </div>
        </PageContent>

        <PageContent>
          <div className="grid h-full gap-3">
            <ActiveUsersSection />
            </div>
            <Sandbox />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
      <ContributorSidepanel />
      <ProjectSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(DataPage));

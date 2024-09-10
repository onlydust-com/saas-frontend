"use client";

import { PropsWithChildren } from "react";

import { GrantFormSidepanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel";
import {
  GrantFormContextProvider,
  useGrantFormContext,
} from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";
import { GrantListSidepanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel";
import { ProjectsTable } from "@/app/programs/[programId]/_features/projects-table/projects-table";
import { FinancialSection } from "@/app/programs/[programId]/_sections/financial-section/financial-section";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ProjectSidePanelProvider } from "@/shared/panels/project-sidepanel/project-sidepanel.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

function WithProjectPanelProvider({ children }: PropsWithChildren) {
  const {
    sidePanel: { open: openGrantForm },
    projectIdState: [, setGrantProjectId],
  } = useGrantFormContext();

  function handleOpenProjectGrant(projectId: string) {
    setGrantProjectId(projectId);
    openGrantForm();
  }

  return <ProjectSidePanelProvider onGrantClick={handleOpenProjectGrant}>{children}</ProjectSidePanelProvider>;
}

export default function ProgramPage({ params: { programId } }: { params: { programId: string } }) {
  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
  });

  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"programs:list.header.title"} />,
            href: NEXT_ROUTER.programs.root,
          },
          {
            id: "details",
            label: data?.name,
          },
        ],
      }}
    >
      <PosthogCaptureOnMount eventName={"program_viewed"} />
      <GrantFormContextProvider>
        <WithProjectPanelProvider>
          <AnimatedColumn className="flex h-full flex-1 flex-col gap-md overflow-auto">
            <div className="h-auto">
              <PageContent>
                <FinancialSection />
              </PageContent>
            </div>
            <PageContent>
              <div className="grid gap-3">
                <header className={"flex items-center justify-between"}>
                  <Typo
                    variant={"heading"}
                    size={"xs"}
                    weight={"medium"}
                    translate={{
                      token: "programs:details.projects.title",
                    }}
                  />

                  <GrantListSidepanel />
                </header>

                <ProjectsTable programId={programId} />
                <GrantFormSidepanel />
              </div>
            </PageContent>
          </AnimatedColumn>
        </WithProjectPanelProvider>
      </GrantFormContextProvider>
    </PageWrapper>
  );
}

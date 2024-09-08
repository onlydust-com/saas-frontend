"use client";

import { ChevronRight } from "lucide-react";
import { PropsWithChildren, useState } from "react";

import { FinancialSection } from "@/app/financials/[sponsorId]/_sections/financial-section/financial-section";
import { useGrantFormContext } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { AllocateProgramSidepanelProvider } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.context";
import { ProgramListSidepanelProvider } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel.context";
import { ProjectSidePanelProvider } from "@/shared/panels/project-sidepanel/project-sidepanel.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProgramsTable } from "./_features/programs-table/programs-table";

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

function SafeFinancialPage({ sponsorId }: { sponsorId: string }) {
  const { open } = useSidePanelsContext();
  const [selectedProgramId, setSelectedProgramId] = useState<string>();

  function handleOpenAllocateProgram(programId: string) {
    setSelectedProgramId(programId);
    open("allocate-program");
  }

  return (
    <ProgramListSidepanelProvider
      sponsorId={sponsorId}
      onProgramClick={handleOpenAllocateProgram}
      onCreateProgramClick={() => alert("create program")}
    >
      <AllocateProgramSidepanelProvider programId={selectedProgramId}>
        <WithProjectPanelProvider>
          <AnimatedColumn className="flex h-full flex-1 flex-col gap-3 overflow-auto">
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
                      token: "financials:details.programs.title",
                    }}
                  />
                  <div className={"flex flex-row items-center justify-end gap-lg"}>
                    <Button
                      variant={"primary"}
                      endIcon={{ component: ChevronRight }}
                      isTextButton
                      size={"md"}
                      onClick={() => open("program-list")}
                    >
                      <Translate token={"financials:details.programs.actions.allocate"} />
                    </Button>
                    <Button
                      variant={"primary"}
                      endIcon={{ component: ChevronRight }}
                      isTextButton
                      size={"md"}
                      onClick={() => {}}
                    >
                      <Translate token={"financials:details.programs.actions.create"} />
                    </Button>
                  </div>
                </header>

                <ProgramsTable onAllocateClick={handleOpenAllocateProgram} />
              </div>
            </PageContent>
          </AnimatedColumn>
        </WithProjectPanelProvider>
      </AllocateProgramSidepanelProvider>
    </ProgramListSidepanelProvider>
  );
}

export default function FinancialPage({ params: { sponsorId } }: { params: { sponsorId: string } }) {
  const { data } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"financials:list.header.title"} />,
            href: NEXT_ROUTER.financials.root,
          },
          {
            id: "details",
            label: data?.name,
          },
        ],
      }}
    >
      <PosthogCaptureOnMount eventName={"financial_viewed"} />
      <SafeFinancialPage sponsorId={sponsorId} />
    </PageWrapper>
  );
}

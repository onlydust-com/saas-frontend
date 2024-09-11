"use client";

import { PropsWithChildren } from "react";

import { CreateProgramPanel } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel";
import { EditProgramPanel } from "@/app/financials/[sponsorId]/_features/edit-program-panel/edit-program-panel";
import { FinancialSection } from "@/app/financials/[sponsorId]/_sections/financial-section/financial-section";
import { ProgramsSection } from "@/app/financials/[sponsorId]/_sections/programs-section/programs-section";
import { useGrantFormContext } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { AllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel";
import { useAllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.hooks";
import { ProgramListSidepanelProvider } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel.context";
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

function SafeFinancialPage({ sponsorId }: { sponsorId: string }) {
  const { open: openAllocateProgramSidepanel } = useAllocateProgramSidepanel();

  function handleOpenAllocateProgram(programId: string) {
    openAllocateProgramSidepanel({ programId, sponsorId });
  }

  return (
    <ProgramListSidepanelProvider
      sponsorId={sponsorId}
      onProgramClick={handleOpenAllocateProgram}
      onCreateProgramClick={() => alert("create program")}
    >
      <WithProjectPanelProvider>
        <AnimatedColumn className="flex h-full flex-1 flex-col gap-md overflow-auto">
          <div className="h-auto">
            <PageContent>
              <FinancialSection />
            </PageContent>
          </div>
          <PageContent>
            <ProgramsSection onAllocateClick={handleOpenAllocateProgram} />
          </PageContent>
        </AnimatedColumn>
      </WithProjectPanelProvider>
      <AllocateProgramSidepanel />
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
      <PosthogCaptureOnMount
        eventName={"sponsor_viewed"}
        params={{
          sponsor_id: sponsorId,
        }}
        paramsReady={Boolean(sponsorId)}
      />
      <SafeFinancialPage sponsorId={sponsorId} />
      <EditProgramPanel />
      <CreateProgramPanel />
    </PageWrapper>
  );
}

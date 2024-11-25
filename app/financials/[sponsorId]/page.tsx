"use client";

import { CreateProgramPanel } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel";
import { EditProgramPanel } from "@/app/financials/[sponsorId]/_features/edit-program-panel/edit-program-panel";
import { Views } from "@/app/financials/[sponsorId]/_views/views";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { DepositFlow } from "@/shared/panels/_flows/deposit-flow/deposit-flow";
import { AllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel";
import { useAllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.hooks";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { ProgramListSidepanel } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel";
import { ProgramSidepanel } from "@/shared/panels/program-sidepanel/program-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

// This component is required for the ProgramListSidepanel to open a child panel correctly
function Safe({ sponsorId }: { sponsorId: string }) {
  const { open: openAllocateProgramSidepanel } = useAllocateProgramSidepanel();

  function handleOpenAllocateProgram(programId: string, canGoBack?: boolean) {
    openAllocateProgramSidepanel({ programId, sponsorId, canGoBack });
  }
  return (
    <>
      <PosthogCaptureOnMount
        eventName={"sponsor_viewed"}
        params={{
          sponsor_id: sponsorId,
        }}
        paramsReady={Boolean(sponsorId)}
      />

      <AnimatedColumn className="h-full">
        <ScrollView className={"flex flex-col"}>
          <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
            <Views sponsorId={sponsorId} />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <ProgramListSidepanel sponsorId={sponsorId} onProgramClick={handleOpenAllocateProgram} />
      <AllocateProgramSidepanel />
      <DepositFlow />
      <FinancialDetailSidepanel />
      <EditProgramPanel />
      <CreateProgramPanel />
      <ProgramSidepanel />
    </>
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
      <Safe sponsorId={sponsorId} />
    </PageWrapper>
  );
}

"use client";

import { PropsWithChildren } from "react";

import { useGrantFormContext } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

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

export default function FinancialPage({ params: { sponsorId } }: { params: { sponsorId: string } }) {
  const { data } = SponsorReactQueryAdapter.client.useGetSponsors({
    pathParams: {
      sponsorId,
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
      <WithProjectPanelProvider>
        <AnimatedColumn className="flex h-full flex-1 flex-col gap-3 overflow-auto">
          <div className="h-auto">
            <PageContent>
              <div>STATS SECTION</div>
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
              </header>

              <div>PROGRAM TABLE</div>
            </div>
          </PageContent>
        </AnimatedColumn>
      </WithProjectPanelProvider>
    </PageWrapper>
  );
}

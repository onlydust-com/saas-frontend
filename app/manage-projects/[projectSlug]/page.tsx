"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { FinancialSection } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/financial-section";
import { ContributorsTable } from "@/app/manage-projects/[projectSlug]/features/contributors-table/contributors-table";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { ProjectUpdateSidepanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

function ManageProjectsSinglePage({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsBySlug({
    pathParams: { projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

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
            label: data?.name ?? "",
          },
        ],
      }}
    >
      <PosthogCaptureOnMount
        eventName={"project_dashboard_viewed"}
        params={{
          project_id: data?.id,
        }}
        paramsReady={Boolean(data?.id)}
      />

      <AnimatedColumn className="flex h-full flex-1 flex-col gap-md overflow-auto">
        <ScrollView className="flex flex-col gap-4">
          <PageContent>
            <div className="grid h-full gap-3">
              <FinancialSection projectId={data?.id} />
            </div>
          </PageContent>
          <PageContent>
            <div className="grid h-full gap-3">
              <ContributorsTable />
            </div>
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <FinancialDetailSidepanel />
      <ContributorSidepanel />
      <ProjectUpdateSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(ManageProjectsSinglePage));

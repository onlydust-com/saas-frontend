"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";

import { ActivitySection } from "@/app/manage-projects/[projectSlug]/_sections/activity-section/activity-section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { RepoIndexingAlert } from "@/shared/features/alerts/repo-indexing-alert/repo-indexing-alert";
import { GithubMissingPermissionsAlert } from "@/shared/features/github-permissions/_components/github-missing-permissions-alert/github-missing-permissions-alert";
import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ActionPoolingProvider } from "@/shared/hooks/action-pooling/action-pooling.context";
import { RewardFlowProvider } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { ProjectUpdateSidepanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel";
import { RewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

function ManageProjectsSinglePage({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  const [openAlert, setOpenAlert] = useState(false);

  const hasAlreadyClosedAlert = useRef(false);
  const { data } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsBySlug({
    pathParams: { projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const { data: projectData } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  useEffect(() => {
    if (projectData?.isSomeOrganizationMissingPermissions() && !hasAlreadyClosedAlert.current) {
      setOpenAlert(true);
    }
  }, [projectData]);

  function handleCloseAlert() {
    setOpenAlert(false);
    hasAlreadyClosedAlert.current = true;
  }

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
      <ActionPoolingProvider interval={2000} limit={4}>
        <GithubPermissionsProvider projectSlug={projectSlug}>
          <RewardFlowProvider projectId={data?.id}>
            <PosthogCaptureOnMount
              eventName={"project_dashboard_viewed"}
              params={{
                project_id: data?.id,
              }}
              paramsReady={Boolean(data?.id)}
            />

            <AnimatedColumn className="h-full">
              <ScrollView className="flex flex-col gap-md">
                {openAlert ? <GithubMissingPermissionsAlert onClose={handleCloseAlert} /> : null}
                <RepoIndexingAlert indexingComplete={projectData?.isIndexingCompleted() ?? true} />
                <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
                  <ActivitySection projectId={data?.id} />
                </PageContent>
              </ScrollView>
            </AnimatedColumn>

            <FinancialDetailSidepanel />
            <RewardDetailSidepanel />
            <ContributorSidepanel />
            <ProjectUpdateSidepanel />
            <ContributionsSidepanel />
          </RewardFlowProvider>
        </GithubPermissionsProvider>
      </ActionPoolingProvider>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(ManageProjectsSinglePage));

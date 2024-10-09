"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ActivitySection } from "@/app/manage-projects/[projectSlug]/_sections/activity-section/activity-section";
import { FinancialSection } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/financial-section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal";
import { useManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.hooks";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
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

  const { isOpen, setIsOpen } = useManageApplicantsModal();

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

      <AnimatedColumn className="h-full">
        <Button onClick={() => setIsOpen(true)}>Manage applicants</Button>
        <ScrollView className="flex flex-col gap-md">
          <PageContent classNames={{ base: "flex-none" }}>
            <FinancialSection projectId={data?.id} />
          </PageContent>
          <PageContent classNames={{ base: "overflow-hidden" }}>
            <ActivitySection projectId={data?.id} />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <FinancialDetailSidepanel />
      <ContributorSidepanel />
      <ProjectUpdateSidepanel />
      <ContributionsSidepanel />

      <ManageApplicantsModal isOpen={isOpen} onOpenChange={setIsOpen} projectId={data?.id} />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(ManageProjectsSinglePage));

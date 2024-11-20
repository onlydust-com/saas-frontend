"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ActivitySection } from "@/app/my-dashboard/_sections/activity-section/activity-section";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { RequestPaymentFlowProvider } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { RewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { FinancialSection } from "./_sections/financial-section/financial-section";

function MyDashboardPage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"myDashboard:detail.header.title"} />,
          },
        ],
      }}
    >
      <GithubPermissionsProvider>
        <RequestPaymentFlowProvider>
          <PosthogCaptureOnMount eventName={"my_dashboard_viewed"} />

          <AnimatedColumn className="h-full">
            <ScrollView className="flex flex-col gap-md">
              <PageContent classNames={{ base: "flex-none" }}>
                <FinancialSection />
              </PageContent>
              <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
                <ActivitySection />
              </PageContent>
            </ScrollView>
          </AnimatedColumn>

          <FinancialDetailSidepanel />
          <RewardDetailSidepanel />
          <ContributorSidepanel />
          <ContributionsSidepanel />
        </RequestPaymentFlowProvider>
      </GithubPermissionsProvider>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(MyDashboardPage));

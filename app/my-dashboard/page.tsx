"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ActivitySection } from "@/app/my-dashboard/_sections/activity-section/activity-section";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

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
      <PosthogCaptureOnMount eventName={"my_dashboard_viewed"} />

      <AnimatedColumn className="h-full">
        <ScrollView className="flex flex-col gap-md">
          <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
            <ActivitySection />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <ContributorSidepanel />
      <ContributionsSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(MyDashboardPage));

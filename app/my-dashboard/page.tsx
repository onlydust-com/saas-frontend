"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ActivitySection } from "@/app/my-dashboard/_sections/activity-section/activity-section";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
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
      <AnimatedColumn className="h-full">
        <ScrollView className="flex flex-col gap-md">
          <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
            <ActivitySection />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(MyDashboardPage));

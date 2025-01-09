"use client";

import { HackathonDescription } from "@/app/hackathons/[hackathonSlug]/overview/_features/hackathon-description/hackathon-description";
import { HackathonStats } from "@/app/hackathons/[hackathonSlug]/overview/_features/hackathon-stats/hackathon-stats";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function HackathonOverviewPage({ params: { hackathonSlug } }: { params: { hackathonSlug: string } }) {
  const { data: hackathon } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug,
    },
    options: {
      enabled: Boolean(hackathonSlug),
    },
  });

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: hackathon?.title,
          },
          {
            id: "overview",
            label: <Translate token={"hackathon:details.tabs.overview"} />,
          },
        ]}
      />

      <HackathonStats
        countRegistered={hackathon?.subscriberCount}
        countAvailableIssues={hackathon?.availableIssueCount}
        totalAvailableIssues={hackathon?.issueCount}
        countProjects={hackathon?.projectCount}
        endsAt={hackathon?.endDate}
      />

      <HackathonDescription description={hackathon?.description} />
    </ScrollView>
  );
}

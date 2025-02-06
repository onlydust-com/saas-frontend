"use client";

import { HackathonDescription } from "@/app/(saas)/osw/[hackathonSlug]/overview/_features/hackathon-description/hackathon-description";
import { HackathonStats } from "@/app/(saas)/osw/[hackathonSlug]/overview/_features/hackathon-stats/hackathon-stats";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

function HackathonOverviewPage({ params: { hackathonSlug } }: { params: { hackathonSlug: string } }) {
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
      <PosthogCaptureOnMount
        eventName={"hackathon_viewed"}
        params={{
          hackathon_id: hackathon?.id,
        }}
        paramsReady={Boolean(hackathon?.id)}
      />

      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Hackathons",
            href: NEXT_ROUTER.hackathons.root,
          },
          {
            id: "slug",
            label: hackathonSlug,
          },
          {
            id: "overview",
            label: <Translate token={"osw:details.tabs.overview"} />,
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

export default withClientOnly(HackathonOverviewPage);

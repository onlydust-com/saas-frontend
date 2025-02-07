"use client";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

function HackathonCommunityPage({ params: { hackathonSlug } }: { params: { hackathonSlug: string } }) {
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
            label: hackathon?.title,
          },
          {
            id: "community",
            label: <Translate token={"osw:details.tabs.community"} />,
          },
        ]}
      />
    </ScrollView>
  );
}

export default withClientOnly(HackathonCommunityPage);

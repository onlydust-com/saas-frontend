"use client";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function HackathonCommunityPage({ params: { hackathonSlug } }: { params: { hackathonSlug: string } }) {
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
            id: "community",
            label: <Translate token={"hackathon:details.tabs.community"} />,
          },
        ]}
      />
    </ScrollView>
  );
}

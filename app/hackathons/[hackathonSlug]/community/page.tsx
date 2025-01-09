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

      <p className="border-b-1 border-border-primary p-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis eligendi dignissimos ullam odit, qui
        officiis fuga non soluta mollitia, repudiandae, cupiditate blanditiis corporis facilis asperiores distinctio
        commodi consequuntur quidem pariatur.
      </p>
    </ScrollView>
  );
}

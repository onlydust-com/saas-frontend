"use client";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { RewardsTable } from "./_components/rewards-table/rewards-table";

export default function ProjectRewardsPage({ params }: { params: { projectSlug: string } }) {
  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: params.projectSlug,
          },
          {
            id: "rewards",
            label: <Translate token={"project:details.tabs.rewards"} />,
          },
        ]}
      />
      <RewardsTable params={params} />
    </ScrollView>
  );
}

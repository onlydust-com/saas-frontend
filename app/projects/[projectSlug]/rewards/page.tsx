"use client";

import { FolderOpen } from "lucide-react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { RewardsTable } from "./_components/rewards-table/rewards-table";

export default function ProjectRewardsPage({ params }: { params: { projectSlug: string } }) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: data?.name,
            iconProps: {
              component: FolderOpen,
            },
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

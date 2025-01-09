"use client";

import { FolderOpen } from "lucide-react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { Description } from "./_features/description/description";
import { Stats } from "./_features/stats/stats";

export default function ProjectOverviewPage({ params }: { params: { projectSlug: string } }) {
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
            id: "overview",
            label: <Translate token={"project:details.tabs.overview"} />,
          },
        ]}
      />
      <Stats
        contributors={data?.contributorCount}
        prMerged={data?.mergedPrCount}
        stars={data?.starCount}
        issues={data?.availableIssueCount}
      />
      {/* TODO REPLACE BY LONG DESCRIPTION */}
      <Description description={data?.shortDescription} />
    </ScrollView>
  );
}

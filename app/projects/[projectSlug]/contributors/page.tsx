"use client";

import { FolderOpen } from "lucide-react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ContributorsTable } from "./_components/contributors-table/contributors-table";

export default function ProjectContributorsPage({ params }: { params: { projectSlug: string } }) {
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
            id: "contributors",
            label: <Translate token={"project:details.tabs.contributors"} />,
          },
        ]}
      />
      <ContributorsTable params={{ projectSlug: params.projectSlug }} />
    </ScrollView>
  );
}

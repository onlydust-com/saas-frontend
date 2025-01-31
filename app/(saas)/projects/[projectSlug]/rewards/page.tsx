"use client";

import { FolderOpen } from "lucide-react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { RewardsTable } from "./_components/rewards-table/rewards-table";

function ProjectRewardsPage({ params }: { params: { projectSlug: string } }) {
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
      <PosthogCaptureOnMount
        eventName={"project_viewed"}
        params={{
          id_project: data?.id,
          project_id: data?.id,
          type: "full",
          issues: data?.availableIssueCount,
          tab: "rewards",
        }}
        paramsReady={Boolean(data)}
      />

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

export default withClientOnly(withAuthenticated(ProjectRewardsPage));

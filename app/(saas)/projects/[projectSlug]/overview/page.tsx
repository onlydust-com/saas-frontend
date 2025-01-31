"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { Description } from "./_features/description/description";
import { Stats } from "./_features/stats/stats";

function ProjectOverviewPage({ params }: { params: { projectSlug: string } }) {
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
          tab: "overview",
        }}
        paramsReady={Boolean(data)}
      />

      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Projects",
            href: NEXT_ROUTER.projects.root,
          },
          {
            id: "name",
            label: data?.name,
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

      <Description description={data?.longDescription} />
    </ScrollView>
  );
}

export default withClientOnly(withAuthenticated(ProjectOverviewPage));

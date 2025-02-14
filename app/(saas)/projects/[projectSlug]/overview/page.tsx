"use client";

import { AvailableIssues } from "@/app/(saas)/projects/[projectSlug]/overview/_features/available-issues/available-issues";
import { GoodFirstIssues } from "@/app/(saas)/projects/[projectSlug]/overview/_features/good-first-issues/good-first-issues";
import { RecentActivity } from "@/app/(saas)/projects/[projectSlug]/overview/_features/recent-activity/recent-activity";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ActivityGraph } from "./_features/activity-graph/activity-graph";
import { Description } from "./_features/description/description";
import { Languages } from "./_features/languages/languages";
import { SimilarProjects } from "./_features/similar-projects/similar-projects";

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

      <div className="grid w-full grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-full">
          <Description description={data?.overview} projectId={data?.id} title={"Overview by OnlyDust"} isIaGenerated />
        </div>
        <div className="col-span-full">
          <Description description={data?.longDescription} projectId={data?.id} title={"Description"} />
        </div>
        <div className="grid md:col-span-full lg:col-span-1">
          <Languages projectId={data?.id} />
        </div>
        <div className="grid md:col-span-full lg:col-span-3">
          <ActivityGraph />
        </div>
        <div className="grid md:col-span-full lg:col-span-2">
          <GoodFirstIssues projectId={data?.id} />
        </div>

        <div className="grid md:col-span-full lg:col-span-2">
          <AvailableIssues projectId={data?.id} />
        </div>

        <div className="grid md:col-span-full lg:col-span-2">
          <RecentActivity projectId={data?.id} />
        </div>

        <div className="grid md:col-span-full lg:col-span-2">
          <SimilarProjects projectIdOrSlug={params.projectSlug} projectId={data?.id} />
        </div>
      </div>
    </ScrollView>
  );
}

export default withClientOnly(ProjectOverviewPage);

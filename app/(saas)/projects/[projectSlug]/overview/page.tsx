"use client";

import { AvailableIssues } from "@/app/(saas)/projects/[projectSlug]/overview/_features/available-issues/available-issues";
import { GoodFirstIssues } from "@/app/(saas)/projects/[projectSlug]/overview/_features/good-first-issues/good-first-issues";
import { RecentActivity } from "@/app/(saas)/projects/[projectSlug]/overview/_features/recent-activity/recent-activity";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { RenderComponent } from "@/shared/features/render-component/render-component";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";
import { Skeleton } from "@/shared/ui/skeleton";

import { ActivityGraph } from "./_features/activity-graph/activity-graph";
import { Description } from "./_features/description/description";
import { Languages } from "./_features/languages/languages";
import { LatestNews } from "./_features/latest-news/latest-news";
import { SimilarProjects } from "./_features/similar-projects/similar-projects";

function ProjectOverviewPage({ params }: { params: { projectSlug: string } }) {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  console.log("isLoading", isLoading);

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

      <RenderComponent isLoading={isLoading} isError={isError}>
        <RenderComponent.Loading>
          <Skeleton className="h-screen w-full" />
        </RenderComponent.Loading>
        <RenderComponent.Error errorMessage="Error loading overview" />
        <RenderComponent.Default>
          <div className="grid w-full grid-cols-1 gap-6 overflow-hidden lg:grid-cols-4">
            {data?.id && (
              <div className="col-span-full tablet:hidden">
                <LatestNews projectId={data?.id} className="w-full max-w-full border-border bg-card" />
              </div>
            )}
            {data?.overview && (
              <div className="col-span-full">
                <Description
                  description={data?.overview}
                  projectId={data?.id}
                  title={"Overview by OnlyDust"}
                  isAiGenerated
                />
              </div>
            )}
            {data?.longDescription && (
              <div className="col-span-full">
                <Description description={data?.longDescription} projectId={data?.id} title={"Description"} />
              </div>
            )}
            <div className="grid lg:col-span-1">
              <Languages projectId={data?.id} />
            </div>
            <div className="grid lg:col-span-3">
              <ActivityGraph projectIdOrSlug={params.projectSlug} />
            </div>
            <div className="grid lg:col-span-2">
              <GoodFirstIssues projectId={data?.id} />
            </div>

            <div className="grid lg:col-span-2">
              <AvailableIssues projectId={data?.id} />
            </div>

            <div className="grid lg:col-span-2">
              <RecentActivity projectId={data?.id} />
            </div>

            <div className="grid lg:col-span-2">
              <SimilarProjects projectIdOrSlug={params.projectSlug} projectId={data?.id} />
            </div>
          </div>
        </RenderComponent.Default>
      </RenderComponent>
    </ScrollView>
  );
}

export default withClientOnly(ProjectOverviewPage);

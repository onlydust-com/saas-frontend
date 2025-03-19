"use client";

import { LatestNews } from "@/app/(saas)/projects/[projectSlug]/overview/_features/latest-news/latest-news";
import { RecentActivity } from "@/app/(saas)/projects/[projectSlug]/overview/_features/recent-activity/recent-activity";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

import { ProjectAside } from "./_components/project-aside";
import { ProjectDescription } from "./_components/project-description";
import { ProjectHeader } from "./_components/project-header";
import { ProjectNews } from "./_components/project-news";

export default function ProjectDetailPage({ params }: { params: { projectSlugV2: string } }) {
  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlugV2,
    },
    options: {
      enabled: Boolean(params.projectSlugV2),
    },
  });

  return (
    <div className="flex w-full flex-col gap-6 py-6 md:flex-row">
      <PosthogCaptureOnMount
        eventName={"project_viewed"}
        params={{
          id_project: project?.id,
          project_id: project?.id,
          type: "full",
          issues: project?.availableIssueCount,
        }}
        paramsReady={Boolean(project)}
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
            label: project?.name,
          },
          {
            id: "overview",
            label: "Overview",
          },
        ]}
      />

      <div className="flex-1 shrink-0 md:max-w-[200px] lg:max-w-[300px]">
        <ProjectAside projectSlug={params.projectSlugV2} />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-6">
          <ProjectHeader
            id={project?.id}
            name={project?.name}
            shortDescription={project?.shortDescription}
            isLoading={isLoading}
            isError={isError}
          />

          {project?.id && <LatestNews projectId={project.id} className="w-full max-w-full border-border bg-card" />}

          <ProjectNews projectId={project?.id} />

          <ProjectDescription
            description={project?.overview}
            projectId={project?.id}
            title={"Overview by OnlyDust"}
            isAiGenerated
            isLoading={isLoading}
            isError={isError}
          />

          <ProjectDescription
            description={project?.longDescription}
            projectId={project?.id}
            title={"Description"}
            isLoading={isLoading}
            isError={isError}
          />

          <RecentActivity projectId={project?.id} />
        </div>
      </div>
    </div>
  );
}

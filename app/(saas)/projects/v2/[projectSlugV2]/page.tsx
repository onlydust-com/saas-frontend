"use client";

import { Description } from "@/app/(saas)/projects/[projectSlug]/overview/_features/description/description";
import { LatestNews } from "@/app/(saas)/projects/[projectSlug]/overview/_features/latest-news/latest-news";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

import { ProjectHeader } from "./_components/project-header";

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
    <div className="flex flex-col gap-6">
      <PosthogCaptureOnMount
        eventName={"project_viewed"}
        params={{
          id_project: project?.id,
          project_id: project?.id,
          type: "full",
          issues: project?.availableIssueCount,
          tab: "overview",
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

      <ProjectHeader id={project?.id} name={project?.name} shortDescription={project?.shortDescription} />

      {project?.id && (
        <div className="col-span-full tablet:hidden">
          <LatestNews projectId={project.id} className="w-full max-w-full border-border bg-card" />
        </div>
      )}

      {project?.overview ? (
        <Description
          description={project.overview}
          projectId={project?.id}
          title={"Overview by OnlyDust"}
          isAiGenerated
        />
      ) : null}

      {project?.longDescription ? (
        <Description description={project.longDescription} projectId={project?.id} title={"Description"} />
      ) : null}
    </div>
  );
}

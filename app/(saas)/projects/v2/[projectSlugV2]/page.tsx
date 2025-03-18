"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

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
    <div>
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

      <ProjectHeader id={project?.id} name={project?.name} shortDescription={project?.shortDescription} />
    </div>
  );
}

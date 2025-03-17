"use client";

import { ProjectCommunity } from "@/app/(saas)/projects/v2/[projectSlugV2]/_components/project-aside-community";
import { ProjectRepos } from "@/app/(saas)/projects/v2/[projectSlugV2]/_components/project-aside-repos";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ProjectAvatar } from "../_components/project-aside-avatar";
import { ProjectCategories } from "../_components/project-aside-categories";
import { ProjectEcosystems } from "../_components/project-aside-ecosystems";
import { ProjectLanguages } from "../_components/project-aside-languages";
import { ProjectMaintainers } from "../_components/project-aside-maintainers";

export function ProjectAside({ projectSlug }: { projectSlug: string }) {
  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  return (
    <aside className="space-y-4">
      <ProjectAvatar logoUrl={project?.logoUrl} name={project?.name} isLoading={isLoading} isError={isError} />

      <ProjectCommunity moreInfos={project?.moreInfos} isLoading={isLoading} isError={isError} />

      <ProjectLanguages languages={project?.languages} isLoading={isLoading} isError={isError} />

      <ProjectEcosystems ecosystems={project?.ecosystems} isLoading={isLoading} isError={isError} />

      <ProjectCategories categories={project?.categories} isLoading={isLoading} isError={isError} />

      <ProjectMaintainers maintainers={project?.leads} isLoading={isLoading} isError={isError} />

      <ProjectRepos repos={project?.repos} isLoading={isLoading} isError={isError} />
    </aside>
  );
}

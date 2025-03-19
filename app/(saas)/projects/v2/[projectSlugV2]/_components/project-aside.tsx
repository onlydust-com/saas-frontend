"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ProjectAvatar } from "./project-aside-avatar";
import { ProjectCategories } from "./project-aside-categories";
import { ProjectCommunity } from "./project-aside-community";
import { ProjectContributors } from "./project-aside-contributors";
import { ProjectEcosystems } from "./project-aside-ecosystems";
import { ProjectLanguages } from "./project-aside-languages";
import { ProjectMaintainers } from "./project-aside-maintainers";
import { ProjectRepos } from "./project-aside-repos";

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

      <ProjectContributors projectIdOrSlug={projectSlug} />

      <ProjectRepos repos={project?.repos} isLoading={isLoading} isError={isError} />
    </aside>
  );
}

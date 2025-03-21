"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ProjectActions } from "./project-actions";
import { ProjectActivity } from "./project-activity";
import { ProjectAvatar } from "./project-aside-avatar";
import { ProjectCategories } from "./project-aside-categories";
import { ProjectCommunity } from "./project-aside-community";
import { ProjectContributors } from "./project-aside-contributors";
import { ProjectEcosystems } from "./project-aside-ecosystems";
import { ProjectLanguages } from "./project-aside-languages";
import { ProjectMaintainers } from "./project-aside-maintainers";
import { ProjectRepos } from "./project-aside-repos";
import { ProjectDescription } from "./project-description";
import { ProjectIssues } from "./project-issues";
import { ProjectNews } from "./project-news";
import { ProjectTitle } from "./project-title";

export function ViewMobile({ projectSlug }: { projectSlug: string }) {
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
    <div className="flex flex-col gap-4 md:hidden">
      <ProjectNews projectId={project?.id} />

      <div className="flex justify-end">
        <ProjectActions projectId={project?.id} projectName={project?.name} isLoading={isLoading} isError={isError} />
      </div>

      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ProjectAvatar logoUrl={project?.logoUrl} name={project?.name} isLoading={isLoading} isError={isError} />
        </div>

        <ProjectTitle
          id={project?.id}
          name={project?.name}
          shortDescription={project?.shortDescription}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

      <ProjectLanguages languages={project?.languages} isLoading={isLoading} isError={isError} />

      <ProjectDescription
        description={project?.overview}
        projectId={project?.id}
        title={"Overview by OnlyDust"}
        isAiGenerated
        isLoading={isLoading}
        isError={isError}
      />

      <ProjectIssues projectSlug={projectSlug} />

      <ProjectActivity projectSlug={projectSlug} projectId={project?.id} />

      <ProjectCommunity moreInfos={project?.moreInfos} isLoading={isLoading} isError={isError} />

      <ProjectEcosystems ecosystems={project?.ecosystems} isLoading={isLoading} isError={isError} />

      <ProjectCategories categories={project?.categories} isLoading={isLoading} isError={isError} />

      <ProjectMaintainers maintainers={project?.leads} isLoading={isLoading} isError={isError} />

      <ProjectContributors projectIdOrSlug={projectSlug} />

      <ProjectRepos repos={project?.repos} isLoading={isLoading} isError={isError} />
    </div>
  );
}

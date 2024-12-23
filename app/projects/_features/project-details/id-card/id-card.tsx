import { useCallback } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { CardProjectOverview, CardProjectOverviewLoading } from "@/design-system/molecules/cards/card-project-overview";

import { ErrorState } from "@/shared/components/error-state/error-state";

import { IdCardProps } from "./id-card.types";

export function IdCard({ projectIdOrSlug }: IdCardProps) {
  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug,
    },
  });

  const renderProject = useCallback(() => {
    if (isLoading) {
      return <CardProjectOverviewLoading />;
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!project) {
      return null;
    }

    return (
      <CardProjectOverview
        name={project.name}
        logoUrl={project.logoUrl}
        description={project.shortDescription}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        categories={project.categories}
        languages={project.languages}
        moreInfos={project.moreInfos}
        leaders={project.leads}
      />
    );
  }, [isLoading, isError, project]);

  return <div>{renderProject()}</div>;
}

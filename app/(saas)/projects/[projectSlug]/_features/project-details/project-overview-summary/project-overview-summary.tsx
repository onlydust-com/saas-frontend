"use client";

import { useCallback } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { CardProjectOverview, CardProjectOverviewLoading } from "@/design-system/molecules/cards/card-project-overview";

import { ErrorState } from "@/shared/components/error-state/error-state";

import { ProjectOverviewSummaryProps } from "./project-overview-summary.types";

export function ProjectOverviewSummary({ projectIdOrSlug }: ProjectOverviewSummaryProps) {
  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug,
    },
    options: {
      enabled: Boolean(projectIdOrSlug),
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
        repos={project.repos}
      />
    );
  }, [isLoading, isError, project]);

  return <div>{renderProject()}</div>;
}

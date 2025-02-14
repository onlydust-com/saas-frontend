"use client";

import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

import { ProjectCard } from "./components/project-card/project-card";
import { SimilarProjectsProps } from "./similar-projects.types";

export function SimilarProjects({ projectIdOrSlug, projectId }: SimilarProjectsProps) {
  const { capture } = usePosthog();
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetSimilarProjects({
    pathParams: {
      projectIdOrSlug,
    },
    queryParams: {
      pageSize: 3,
    },
    options: {
      enabled: Boolean(projectIdOrSlug),
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return <Skeleton className="h-[200px] w-full" background="glass" />;
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!projects.length) {
      return (
        <div className={"flex items-center justify-center py-36"}>
          <TypographyMuted>No similar projects found</TypographyMuted>
        </div>
      );
    }

    return (
      <>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.shortDescription}
            slug={project.slug}
            logoUrl={project.logoUrl ?? ""}
            onClick={() => {
              capture("project_overview_click_similar_project", { projectId, targetId: project.id });
            }}
            categories={project?.categories?.map(category => category.name) ?? []}
            languages={project?.languages ?? []}
          />
        ))}
      </>
    );
  }, [isLoading, isError, projects]);

  return (
    <Card className={"flex flex-col gap-4 p-4"}>
      <div className="p-xl">
        <TypographyH3>Similar projects</TypographyH3>
      </div>
      <div className="flex flex-col gap-xl p-xl">{renderProjects}</div>
    </Card>
  );
}

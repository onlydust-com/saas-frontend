"use client";

import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { Card } from "@/shared/ui/card";

import { ProjectCard } from "./components/project-card/project-card";
import { SimilarProjectsProps } from "./similar-projects.types";

export function SimilarProjects({ projectIdOrSlug }: SimilarProjectsProps) {
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

  console.log("data", data);

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return <Skeleton className="h-[200px] w-full" background="glass" />;
    }

    if (isError) {
      return <ErrorState />;
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
            categories={[]}
            languages={[]}
            // categories={project?.categories.map(category => category.name) ?? }
            // languages={project.languages ?? []}
          />
        ))}
      </>
    );
  }, [isLoading, isError, projects]);

  if (!projects.length) {
    return null;
  }

  return (
    <Card className={"flex flex-col gap-4 p-4"}>
      <div className="p-xl">
        <Typo
          size="xs"
          variant="heading"
          color="primary"
          translate={{ token: "project:details.similarProjects.title" }}
        />
      </div>
      <div className="flex flex-col gap-xl p-xl">{renderProjects}</div>
    </Card>
  );
}

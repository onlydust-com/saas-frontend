"use client";

import { useMemo } from "react";

import { ContributorReactQueryAdapter } from "@/core/application/react-query-adapter/contributor";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

import { ProjectCard } from "./components/project-card/project-card";
import { ProjectsProps } from "./projects.types";

export function Projects({ githubLogin }: ProjectsProps) {
  const { data, isLoading, isError } = ContributorReactQueryAdapter.client.useGetContributorProjects({
    queryParams: {
      pageSize: 3,
    },
    pathParams: {
      contributorIdOrLogin: githubLogin,
    },
    options: {
      enabled: Boolean(githubLogin),
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return <Skeleton className="h-[200px] w-full" background="glass" />;
    }

    if (isError) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>Error loading similar projects</TypographyMuted>
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className={"flex items-center justify-center py-10"}>
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
            categories={project?.categories?.map(category => category.name) ?? []}
            languages={project?.languages ?? []}
          />
        ))}
      </>
    );
  }, [isLoading, isError, projects]);

  return (
    <Card className={"flex flex-col gap-4 p-4"}>
      <TypographyH3>Contributor projects</TypographyH3>
      <div className="flex flex-col gap-xl">{renderProjects}</div>
    </Card>
  );
}

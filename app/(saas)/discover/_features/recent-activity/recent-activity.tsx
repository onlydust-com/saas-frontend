"use client";

import { useCallback } from "react";

import { ProjectCard } from "@/app/(saas)/discover/_components/project-card/project-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Skeleton } from "@/shared/ui/skeleton";

export function RecentActivity() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { pageSize: 5 },
  });

  if (isError) return null;

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[120px] w-full rounded-xl" />
      ));
    }

    const projects = data?.pages.flatMap(({ projects }) => projects) ?? [];

    return projects.map(project => (
      <ProjectCard
        key={project.id}
        name={project.name}
        description={project.shortDescription}
        slug={project.slug}
        logoUrl={project.logoUrl}
        categories={project.categories.map(category => category.name)}
        languages={project.languages}
      />
    ));
  }, [data, isLoading]);

  return (
    <Section title="Recent activity">
      <div className="flex flex-col gap-6">{renderProjects()}</div>
    </Section>
  );
}

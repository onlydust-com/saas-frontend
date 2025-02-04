"use client";

import { useCallback } from "react";

import { ProjectCard, ProjectCardSkeleton } from "@/app/(saas)/discover/_components/project-card/project-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectTag } from "@/core/domain/project/project.types";

import { NEXT_ROUTER } from "@/shared/constants/router";

export function GoodFirstIssues() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { pageSize: 6, tags: [ProjectTag.HAS_GOOD_FIRST_ISSUES] },
  });

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => <ProjectCardSkeleton key={index} />);
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

  if (isError) return null;

  return (
    <Section
      title="Good first issues"
      seeMore={`${NEXT_ROUTER.projects.root}?tags=${ProjectTag.HAS_GOOD_FIRST_ISSUES}`}
    >
      <div className="grid gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-3">{renderProjects()}</div>
    </Section>
  );
}

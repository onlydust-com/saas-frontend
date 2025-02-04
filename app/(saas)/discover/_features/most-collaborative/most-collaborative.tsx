"use client";

import { useCallback } from "react";

import { ProjectCard, ProjectCardSkeleton } from "@/app/(saas)/discover/_components/project-card/project-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectTag } from "@/core/domain/project/project.types";

import { NEXT_ROUTER } from "@/shared/constants/router";

export function MostCollaborative() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { pageSize: 5, tags: [ProjectTag.HOT_COMMUNITY] },
  });

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => <ProjectCardSkeleton key={index} />);
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
    <Section title="Most collaborative" seeMore={`${NEXT_ROUTER.projects.root}?tags=${ProjectTag.HOT_COMMUNITY}`}>
      <div className="flex flex-col gap-6">{renderProjects()}</div>
    </Section>
  );
}

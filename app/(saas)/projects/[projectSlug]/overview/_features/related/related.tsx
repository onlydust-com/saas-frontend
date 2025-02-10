"use client";

import { useCallback } from "react";

import { ProjectCard, ProjectCardSkeleton } from "@/app/(saas)/discover/_components/project-card/project-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

export function RelatedProjects(_: { projectIdOrSlug: string }) {
  // const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetSimilarProjects({
  //   pathParams: {
  //     projectIdOrSlug,
  //   },
  //   queryParams: {
  //     pageSize: 6,
  //   },
  //   options: {
  //     enabled: Boolean(projectIdOrSlug),
  //   },
  // });

  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { pageSize: 6 },
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
        logoUrl={project.logoUrl ?? ""}
        categories={[]}
        languages={[]}
      />
    ));
  }, [data, isLoading]);

  if (isError) return null;

  return (
    <Section title="Similar Projects">
      <div className="grid gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-3">{renderProjects()}</div>
    </Section>
  );
}

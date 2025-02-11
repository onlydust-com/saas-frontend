"use client";

import { useCallback } from "react";

import { ProjectCard, ProjectCardSkeleton } from "@/app/(saas)/discover/_components/project-card/project-card";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Card } from "@/shared/ui/card";

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
    queryParams: { pageSize: 3 },
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
    <Card className="bg-transparent p-6">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Related Projects</h2>
          <p className="text-sm text-muted-foreground">Discover other projects that are similar to this one.</p>
        </div>
      </div>
      <div className="grid gap-x-12 gap-y-6 md:grid-cols-1 lg:grid-cols-1">{renderProjects()}</div>
    </Card>
  );
}

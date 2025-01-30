import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Button } from "@/shared/ui/button";
import { TypographyH3 } from "@/shared/ui/typography";

import { ProjectCard } from "../../_components/project-card/project-card";

export function ProjectColumnsSection() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      pageSize: 5,
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  return (
    <section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Trending Column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <TypographyH3>Trending</TypographyH3>
            <Button variant="secondary" size="sm">
              See more
            </Button>
          </div>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Most Collaborative Column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <TypographyH3>Most Collaborative</TypographyH3>
            <Button variant="secondary" size="sm">
              See more
            </Button>
          </div>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Recently Active Column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <TypographyH3>Recently Active</TypographyH3>
            <Button variant="secondary" size="sm">
              See more
            </Button>
          </div>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

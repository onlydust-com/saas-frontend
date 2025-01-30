import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { Button } from "@/shared/ui/button";
import { TypographyH3 } from "@/shared/ui/typography";

import { ProjectCard } from "../../_components/project-card/project-card";

export function FeaturedProjectsSection() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      pageSize: 6,
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isError) {
      return <ErrorState />;
    }

    if (!projects.length && !isLoading) {
      return <EmptyStateLite />;
    }

    return projects.map(project => <ProjectCard key={project.id} project={project} />);
  }, [isError, isLoading, projects]);

  return (
    <section className="flex flex-col gap-4">
      <div className="mb-4 flex items-center justify-between">
        <TypographyH3>Projects with Good first issues</TypographyH3>
        <Button variant="secondary">See more</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{renderProjects}</div>
    </section>
  );
}

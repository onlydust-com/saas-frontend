import { useMemo } from "react";
import { ProjectCard } from "../../_components/project-card/project-card";
import { GoodFirstIssuesSectionProps } from "./good-first-issues.types";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";

export function GoodFirstIssuesSection({ projects, isLoading, isError }: GoodFirstIssuesSectionProps) {
  const renderProjects = useMemo(() => {
    if (isError) {
      return <ErrorState />;
    }

    if (!projects.length && !isLoading) {
      return <EmptyStateLite />;
    }

    return projects.map(project => (
      <ProjectCard
        key={project.id}
        project={project}
      />
    ));
  }, [isError, isLoading, projects]);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Projects with Good First Issues</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renderProjects}
      </div>
    </section>
  );
} 
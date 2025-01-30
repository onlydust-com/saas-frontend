"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetProjectsV2QueryParams } from "@/core/domain/project/project-contract.types";

import { Button } from "@/shared/ui/button";
import { TypographyH4 } from "@/shared/ui/typography";

import { ProjectCard } from "../project-card/project-card";

interface ProjectSubSectionProps {
  title: string;
  filter: GetProjectsV2QueryParams;
}

export function ProjectSubSection({ title, filter }: ProjectSubSectionProps) {
  const { data, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: filter,
  });

  if (isError) {
    return null; // Hide section on error to maintain layout
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <TypographyH4>{title}</TypographyH4>
        <Button variant="secondary" size="sm">
          Show more
        </Button>
      </div>
      <div className="grid gap-4">
        {data?.pages[0].projects.map(project => (
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.shortDescription || ""}
            categories={project.categories.map(cat => cat.name)}
            logoUrl={project.logoUrl || "https://placehold.co/400"}
            languageIcon={project.languages?.[0]?.logoUrl}
          />
        ))}
      </div>
    </section>
  );
}

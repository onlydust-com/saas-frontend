"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetProjectsV2QueryParams } from "@/core/domain/project/project-contract.types";

import { Button } from "@/shared/ui/button";
import { TypographyH3 } from "@/shared/ui/typography";

import { ProjectCard } from "../project-card/project-card";

const FILTER: GetProjectsV2QueryParams = {
  pageIndex: 0,
  pageSize: 6,
  tags: ["HAS_GOOD_FIRST_ISSUES"],
};

export function GoodFirstIssuesSection() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: FILTER,
  });

  if (isError) {
    return null; // Hide section on error to maintain layout
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <TypographyH3>Projects with Good first issues</TypographyH3>
        <Button variant="secondary">Show more</Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {isLoading
          ? // Loading state
            Array(FILTER.pageSize)
              .fill(null)
              .map((_, index) => (
                <ProjectCard
                  key={`loading-${index}`}
                  name="Loading..."
                  description="Loading..."
                  categories={[]}
                  logoUrl=""
                />
              ))
          : // Data state
            data?.pages[0].projects.map(project => (
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

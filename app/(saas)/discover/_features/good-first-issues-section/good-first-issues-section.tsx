"use client";

import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectListItemInterfaceV2 } from "@/core/domain/project/models/project-list-item-model-v2";
import { GetProjectsV2QueryParams } from "@/core/domain/project/project-contract.types";

import { SectionContent } from "@/shared/components/section-content/section-content";

import { ProjectCard } from "../../_components/project-card/project-card";

const FILTER: GetProjectsV2QueryParams = {
  pageIndex: 0,
  pageSize: 6,
  tags: ["HAS_GOOD_FIRST_ISSUES"],
};

function renderSkeletons(count: number) {
  return Array(count)
    .fill(null)
    .map((_, index) => <ProjectCard.Skeleton key={index} />);
}

function renderProjects(projects: ProjectListItemInterfaceV2[]) {
  return projects.map(project => (
    <ProjectCard
      key={project.id}
      name={project.name}
      description={project.shortDescription || ""}
      categories={project.categories.map((cat: { name: string }) => cat.name)}
      logoUrl={project.logoUrl || "https://placehold.co/400"}
      languageIcon={project.languages?.[0]?.logoUrl}
    />
  ));
}

export function GoodFirstIssuesSection() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: FILTER,
  });

  const content = useMemo(() => {
    if (isLoading) {
      return renderSkeletons(FILTER.pageSize);
    }

    if (!data?.pages[0].projects) {
      return null;
    }

    return renderProjects(data.pages[0].projects);
  }, [data, isLoading]);

  return (
    <SectionContent title="Projects with Good first issues" isLoading={isLoading} error={isError}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{content}</div>
    </SectionContent>
  );
}

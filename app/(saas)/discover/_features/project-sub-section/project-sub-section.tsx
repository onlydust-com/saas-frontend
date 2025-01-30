"use client";

import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectListItemInterfaceV2 } from "@/core/domain/project/models/project-list-item-model-v2";
import { GetProjectsV2QueryParams } from "@/core/domain/project/project-contract.types";

import { SectionContent } from "@/shared/components/section-content/section-content";

import { ProjectCard } from "../../_components/project-card/project-card";

interface ProjectSubSectionProps {
  title: string;
  filter: GetProjectsV2QueryParams;
}

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

export function ProjectSubSection({ title, filter }: ProjectSubSectionProps) {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: filter,
  });

  const content = useMemo(() => {
    if (isLoading) {
      return renderSkeletons(filter.pageSize);
    }

    if (!data?.pages[0].projects) {
      return null;
    }

    return renderProjects(data.pages[0].projects);
  }, [data, isLoading, filter.pageSize]);

  return (
    <SectionContent title={title} variant="h4" isLoading={isLoading} error={isError}>
      <div className="grid gap-4">{content}</div>
    </SectionContent>
  );
}

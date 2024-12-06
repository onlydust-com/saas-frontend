"use client";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { ProjectCategoryCard } from "@/design-system/molecules/cards/project-category";
import { ProjectCategoryCardLoading } from "@/design-system/molecules/cards/project-category/project-category.loading";

import { cn } from "@/shared/helpers/cn";

import { ProjectCategoryListProps } from "./project-category-list.types";

export function ProjectCategoryList({ className }: ProjectCategoryListProps) {
  const { data, isLoading } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  if (isLoading) {
    return (
      <div className={cn("flex flex-wrap gap-4", className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCategoryCardLoading key={index} />
        ))}
      </div>
    );
  }

  const gradients = [
    "cosmic_night",
    "deep_ocean",
    "velvet_dusk",
    "arctic_abyss",
    "ember_shadow",
    "mystic_twilight",
  ] as const;

  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {data?.categories.map((category, index) => (
        <ProjectCategoryCard key={category.id} category={category} color={gradients[index % gradients.length]} />
      ))}
    </div>
  );
}

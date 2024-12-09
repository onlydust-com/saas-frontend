"use client";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { CardProjectCategory, CardProjectCategoryLoading } from "@/design-system/molecules/cards/card-project-category";

import { cn } from "@/shared/helpers/cn";

import { ProjectCategoryListProps } from "./project-category-list.types";

export function ProjectCategoryList({ className }: ProjectCategoryListProps) {
  const { data, isLoading } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-2 gap-xl md:grid-cols-3 lg:grid-cols-6", className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <CardProjectCategoryLoading key={index} />
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
    <div className={cn("grid grid-cols-2 gap-xl md:grid-cols-3 lg:grid-cols-6", className)}>
      {data?.categories.map((category, index) => (
        <CardProjectCategory key={category.id} category={category} color={gradients[index % gradients.length]} />
      ))}
    </div>
  );
}

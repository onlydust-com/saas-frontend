"use client";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { CardProjectCategory, CardProjectCategoryLoading } from "@/design-system/molecules/cards/card-project-category";

import { cn } from "@/shared/helpers/cn";

import { Section } from "../../_components/section/section";
import { ProjectCategoryListProps } from "./project-category-list.types";

export function ProjectCategoryList({ className }: ProjectCategoryListProps) {
  const { data, isLoading } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-2 gap-xl tablet:grid-cols-3 desktop:grid-cols-6", className)}>
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
    <Section
      title={{
        translate: { token: "explore:expertise.title" },
      }}
      description={{
        translate: { token: "explore:expertise.description" },
      }}
      classNames={{
        base: "gap-3xl",
      }}
    >
      <div className={cn("grid grid-cols-3 gap-xl tablet:grid-cols-5 desktop:grid-cols-6", className)}>
        {data?.categories.map((category, index) => (
          <CardProjectCategory key={category.id} category={category} color={gradients[index % gradients.length]} />
        ))}
      </div>
    </Section>
  );
}

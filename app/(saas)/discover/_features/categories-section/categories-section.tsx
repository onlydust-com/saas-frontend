"use client";

import { useMemo } from "react";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";
import { ProjectCategory } from "@/core/domain/project-category/models/project-category-model";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

import { SectionContent } from "@/shared/components/section-content/section-content";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";

import { CategoryCard } from "../../_components/category-card/category-card";

const SKELETON_COUNT = 4;

function renderSkeletons(count: number) {
  return Array(count)
    .fill(null)
    .map((_, index) => (
      <div key={index} className="w-[calc(100%/3.5)] flex-none pr-6 first:pl-0">
        <CategoryCard.Skeleton />
      </div>
    ));
}

function renderCategories(categories: ProjectCategory[]) {
  return categories.map(category => (
    <div key={category.id} className="w-[calc(100%/3.5)] flex-none pr-6 first:pl-0">
      <CategoryCard
        color={"red"}
        title={category.name}
        description={category.description}
        icon={category.iconSlug as RemixIconsName}
        projectCount={category.projectCount}
      />
    </div>
  ));
}

export function CategoriesSection() {
  const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  const content = useMemo(() => {
    if (isLoading) {
      return renderSkeletons(SKELETON_COUNT);
    }

    if (!data?.categories) {
      return null;
    }

    return renderCategories(data.categories);
  }, [data, isLoading]);

  return (
    <SectionContent title="Section categories" isLoading={isLoading} error={isError} className="w-full">
      <ScrollArea className="w-full">
        <div className="flex pb-4" style={{ width: "calc(100% + 25%)" }}>
          {content}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </SectionContent>
  );
}

"use client";

import { Typo } from "@/design-system/atoms/typo";

import { ProjectCategoryList } from "@/shared/features/project-category-list/project-category-list";

export function ExpertiseSection() {
  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <Typo variant="heading" size="xs" weight="medium" translate={{ token: "explore:expertise.title" }} />
        <Typo color="secondary" size="xs" translate={{ token: "explore:expertise.description" }} />
      </div>
      <ProjectCategoryList />
    </div>
  );
}

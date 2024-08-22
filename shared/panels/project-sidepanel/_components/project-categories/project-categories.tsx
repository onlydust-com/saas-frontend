import { Tag } from "lucide-react";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ProjectCategoriesGroup } from "@/shared/features/project/project-categories/project-categories-group/project-categories-group";

import { ProjectCategoriesProps } from "./project-categories.types";

export function ProjectCategories({ categories }: ProjectCategoriesProps) {
  if (!categories.length) return null;

  return (
    <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-2 flex-1" }}>
      <div className="flex flex-row gap-1">
        <Tag size={16} />
        <Typo size={"xs"} weight={"medium"} translate={{ token: "panels:projectDetail.categories.title" }} />
      </div>
      <ProjectCategoriesGroup categories={categories} maxCategories={1} />
    </Paper>
  );
}

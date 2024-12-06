import { ElementType } from "react";
import { ComponentPropsWithoutRef } from "react";

import { ProjectCategory } from "@/core/domain/project-category/models/project-category-model";

interface Variants {
  color: "primary" | "secondary" | "brand" | "error" | "warning" | "success";
}

interface ClassNames {
  base: string;
  icon: string;
  name: string;
}

export interface ProjectCategoryCardPort<C extends ElementType = "div"> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  category: ProjectCategory;
}

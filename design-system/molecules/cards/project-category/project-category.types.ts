import { ElementType } from "react";
import { ComponentPropsWithoutRef } from "react";

import { ProjectCategory } from "@/core/domain/project-category/models/project-category-model";

interface Variants {
  color: "cosmic_night" | "deep_ocean" | "velvet_dusk" | "arctic_abyss" | "ember_shadow" | "mystic_twilight";
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

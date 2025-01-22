import { ComponentPropsWithoutRef, ElementType } from "react";

import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { CategoriesProps } from "@/shared/features/projects/categories/categories.types";
import { LanguagesProps } from "@/shared/features/projects/languages/languages.types";

interface ClassNames {
  base: string;
}

export interface CardProjectOverviewPort<C extends ElementType> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  logoUrl?: string;
  name: string;
  contributorCount: number;
  starCount: number;
  forkCount: number;
  description?: string;
  categories?: CategoriesProps["categories"];
  leaders?: ProjectInterfaceV2["leads"];
  languages?: LanguagesProps["languages"];
  moreInfos?: ProjectInterfaceV2["moreInfos"];
  repos?: ProjectInterfaceV2["repos"];
}

import { ComponentPropsWithoutRef, ElementType } from "react";


import { LanguagesProps } from "@/shared/features/projects/languages/languages.types";
import { CategoriesProps } from "@/shared/features/projects/categories/categories.types";

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
  languages?: LanguagesProps["languages"];
}

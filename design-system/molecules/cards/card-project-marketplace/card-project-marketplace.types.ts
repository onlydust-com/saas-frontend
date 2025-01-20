import { ComponentPropsWithoutRef, ElementType } from "react";

import { ProjectTagUnion } from "@/core/domain/project/project.types";
import { AnyType } from "@/core/kernel/types";

import { CategoriesProps } from "@/shared/features/projects/categories/categories.types";
import { LanguagesProps } from "@/shared/features/projects/languages/languages.types";

interface ClassNames {
  base: string;
}

export interface CardProjectMarketplacePort<C extends ElementType> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  logoUrl?: string;
  name: string;
  slug: string;
  contributorCount: number;
  starCount: number;
  forkCount: number;
  availableIssueCount?: number;
  goodFirstIssueCount?: number;
  odhackIssueCount?: number;
  description?: string;
  categories?: CategoriesProps["categories"];
  languages?: LanguagesProps["languages"];
  ecosystems?: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
  }[];
  onClick?: () => void;
  tags?: ProjectTagUnion[];
}

export interface AvatarWithEcosystemsProps {
  name: string;
  logoUrl?: string;
  ecosystems?: CardProjectMarketplacePort<AnyType>["ecosystems"];
}

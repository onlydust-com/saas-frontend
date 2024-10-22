import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgePort } from "@/design-system/atoms/badge";
import { ButtonPort } from "@/design-system/atoms/button/button.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardGithubRepoPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  name?: ReactNode;
  description?: ReactNode;
  starsCount?: number;
  forkCount?: number;
  badges?: BadgePort<AnyType>[];
  topActions?: ButtonPort<AnyType>;
}

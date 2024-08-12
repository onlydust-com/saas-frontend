import { ComponentPropsWithoutRef, ElementType } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { TagPort } from "@/design-system/atoms/tag";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardProjectPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  title: string;
  description?: string;
  logoUrl?: string;
  languages?: Array<TagPort<"div">>;
  categories?: Array<TagPort<"div">>;
  buttonProps?: Partial<ButtonPort<"a">>;
}

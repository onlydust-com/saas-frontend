import { ComponentPropsWithoutRef, ElementType } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { FieldContainerPort } from "@/design-system/atoms/field-container";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface ImageInputPort<C extends ElementType> extends Partial<Variants>, FieldContainerPort {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  name: string;
  maxSizeMo?: number;
  value?: string;
  buttonProps?: ButtonPort<"label">;
}

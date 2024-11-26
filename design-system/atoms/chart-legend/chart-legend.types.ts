import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import { AnyType } from "@/core/kernel/types";

import { TooltipPort } from "@/design-system/atoms/tooltip";

interface Variants {
  size: "s" | "m";
  color: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary" | "senary" | "septenary" | "octonary";
  rawColor: string;
}

interface ClassNames {
  base: string;
  square: string;
  label: string;
}

export interface ChartLegendPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  tooltipProps?: TooltipPort<AnyType>;
}

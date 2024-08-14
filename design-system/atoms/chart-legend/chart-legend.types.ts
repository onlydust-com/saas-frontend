import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

interface Variants {
  size: "s" | "m";
  colors: "brand-4" | "text-2" | "container-3";
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
}

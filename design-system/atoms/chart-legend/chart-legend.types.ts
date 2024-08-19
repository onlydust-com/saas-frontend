import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

interface Variants {
  size: "s" | "m";
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
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

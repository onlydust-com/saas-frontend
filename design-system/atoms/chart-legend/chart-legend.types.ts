import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

interface Variants {
  size: "s" | "m";
  color: "primary" | "secondary" | "tertiary" | "quaternary";
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

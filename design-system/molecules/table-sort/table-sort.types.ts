import { ComponentPropsWithoutRef, ElementType } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface TableSortPort<C extends ElementType>
  extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
}

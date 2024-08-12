import { ElementType } from "react";

import { cn } from "@/shared/helpers/cn";

import { TableSortPort } from "../../table-sort.types";
import { TableSortDefaultVariants } from "./default.variants";

export function TableSortDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  ...props
}: TableSortPort<C>) {
  const Component = as || "div";
  const slots = TableSortDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />
  );
}

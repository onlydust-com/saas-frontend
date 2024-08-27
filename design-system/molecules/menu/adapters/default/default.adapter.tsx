import { ElementType } from "react";

import { cn } from "@/shared/helpers/cn";

import { MenuPort } from "../../menu.types";
import { MenuDefaultVariants } from "./default.variants";

export function MenuDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  ...props
}: MenuPort<C>) {
  const Component = as || "div";
  const slots = MenuDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />
  );
}

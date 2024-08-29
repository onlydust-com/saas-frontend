import { ElementType } from "react";

import { cn } from "@/shared/helpers/cn";

import { TabsPort } from "../../tabs.types";
import { TabsDefaultVariants } from "./default.variants";

export function TabsDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  ...props
}: TabsPort<C>) {
  const Component = as || "div";
  const slots = TabsDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />
  );
}

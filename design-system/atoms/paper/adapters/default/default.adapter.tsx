import { ElementType } from "react";

import { cn } from "@/shared/helpers/cn";

import { PaperPort } from "../../paper.types";
import { PaperDefaultVariants } from "./default.variants";

export function PaperDefaultAdapter<C extends ElementType = "article">({
  as,
  htmlProps,
  children,
  classNames,
  size,
  container,
  border,
  onClick,
}: PaperPort<C>) {
  const Component = as || "article";
  const slots = PaperDefaultVariants({ size, container, border });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} onClick={onClick}>
      {children}
    </Component>
  );
}

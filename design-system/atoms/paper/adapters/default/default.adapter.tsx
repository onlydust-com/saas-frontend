import { ElementType } from "react";

import { cn } from "@/shared/helpers/cn";
import { Apply } from "@/shared/theme/Apply";

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
    <Apply shadow={"md"}>
      <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} onClick={onClick}>
        {children}
      </Component>
    </Apply>
  );
}

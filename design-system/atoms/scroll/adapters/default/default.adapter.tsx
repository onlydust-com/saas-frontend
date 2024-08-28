import { ForwardedRef, forwardRef } from "react";

import { cn } from "@/shared/helpers/cn";

import { ScrollPort } from "../../scroll.types";
import { ScrollDefaultVariants } from "./default.variants";

export const ScrollDefaultAdapter = forwardRef(function ScrollDefaultAdapter(
  { classNames, children, direction = "y" }: ScrollPort,
  ref: ForwardedRef<HTMLDivElement>
) {
  const slots = ScrollDefaultVariants({ direction });

  return (
    <div ref={ref} className={cn(slots.base(), classNames?.base)}>
      {children}
    </div>
  );
});

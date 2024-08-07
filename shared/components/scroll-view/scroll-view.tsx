import { ForwardedRef, forwardRef } from "react";

import { cn } from "@/shared/helpers/cn";

import { ScrollViewProps } from "./scroll-view.types";

export const ScrollView = forwardRef(function ScrollView(
  { className, children }: ScrollViewProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 size-full overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
});

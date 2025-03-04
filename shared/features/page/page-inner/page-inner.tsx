import { cn } from "@/shared/utils";

import { PageInnerProps } from "./page-inner.types";

export function PageInner({ children, size = "small", className, type = "inner" }: PageInnerProps) {
  return (
    <div
      className={cn("mx-auto w-full", className, {
        "max-w-[1400px]": size === "small",
        "max-w-[1600px]": size === "medium",
        "max-w-[2200px]": size === "large",
        "max-w-full": size === "full",
        "page-container px-4 pb-20": type === "page",
      })}
    >
      {children}
    </div>
  );
}

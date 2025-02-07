import { PropsWithChildren } from "react";

import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";
import { cn } from "@/shared/utils";

export function PageContainer({
  children,
  size = "small",
  className,
}: PropsWithChildren<{ size?: "small" | "medium" | "large"; className?: string }>) {
  return (
    <div
      className={cn("page-container mx-auto w-full px-4 pb-20", className, {
        "max-w-[1400px]": size === "small",
        "max-w-[1600px]": size === "medium",
        "max-w-[2200px]": size === "large",
      })}
    >
      <SidePanelsProvider>{children}</SidePanelsProvider>
    </div>
  );
}

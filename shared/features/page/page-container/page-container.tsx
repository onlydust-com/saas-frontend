import { PropsWithChildren } from "react";

import { cn } from "@/shared/utils";

export function PageContainer({ children, size = "lg" }: PropsWithChildren<{ size?: "lg" }>) {
  return <div className={cn("mx-auto px-4", { "lg:container": size === "lg" })}>{children}</div>;
}

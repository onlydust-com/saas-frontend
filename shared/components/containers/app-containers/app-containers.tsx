import { cn } from "@/shared/helpers/cn";

import { AppContainersProps } from "./app-containers.types";

export function AppContainers({ children, className }: AppContainersProps) {
  return <div className={cn("mx-auto h-full w-full max-w-[2560px] overflow-hidden", className)}>{children}</div>;
}

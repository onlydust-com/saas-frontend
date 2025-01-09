import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";

import { PageWrapperProps } from "./page-wrapper.types";

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className={"flex size-full flex-col gap-md overflow-hidden py-xl"}>
      <SidePanelsProvider>{children}</SidePanelsProvider>
    </div>
  );
}

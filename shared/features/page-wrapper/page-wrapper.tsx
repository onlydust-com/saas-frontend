import { SecondaryNavigation } from "@/shared/features/navigation/secondary-navigation/secondary-navigation";
import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";

import { PageWrapperProps } from "./page-wrapper.types";

export function PageWrapper({ children, navigation }: PageWrapperProps) {
  return (
    <div className={"flex size-full flex-col gap-3"}>
      {navigation ? <SecondaryNavigation {...navigation} /> : null}
      <SidePanelsProvider>{children}</SidePanelsProvider>
    </div>
  );
}

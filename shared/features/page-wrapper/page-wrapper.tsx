import { SecondaryNavigation } from "@/shared/features/navigation/secondary-navigation/secondary-navigation";

import { PageWrapperProps } from "./page-wrapper.types";

export function PageWrapper({ children, navigation }: PageWrapperProps) {
  return (
    <div className={"flex h-full w-full flex-col gap-3 overflow-hidden"}>
      {navigation ? <SecondaryNavigation {...navigation} /> : null}
      {children}
    </div>
  );
}

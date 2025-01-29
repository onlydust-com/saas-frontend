import { PropsWithChildren } from "react";

import { NavigationProvider } from "@/shared/features/navigation/navigation.context";

export function SaasProviders({ children }: PropsWithChildren) {
  return <NavigationProvider>{children}</NavigationProvider>;
}

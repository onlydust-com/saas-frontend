import { PropsWithChildren } from "react";

import { NavigationProvider } from "@/shared/features/navigation/navigation.context";
import { SidebarProvider } from "@/shared/ui/sidebar";

export function SaasProviders({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <NavigationProvider>{children}</NavigationProvider>
    </SidebarProvider>
  );
}

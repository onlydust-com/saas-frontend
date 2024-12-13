"use client";

import { PropsWithChildren } from "react";

import { NavigationDesktop } from "@/shared/features/navigation/_features/navigation-desktop/navigation-desktop";
import { NavigationMobile } from "@/shared/features/navigation/_features/navigation-mobile/navigation-mobile";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

import { NavigationProvider } from "./navigation.context";

function SafeNavigation({ children }: PropsWithChildren) {
  const isTablet = useIsTablet("lower");

  if (isTablet) {
    return <NavigationMobile>{children}</NavigationMobile>;
  }
  return <NavigationDesktop>{children}</NavigationDesktop>;
}

export function Navigation({ children }: PropsWithChildren) {
  return (
    <NavigationProvider>
      <SafeNavigation>{children}</SafeNavigation>
    </NavigationProvider>
  );
}

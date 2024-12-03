"use client";

import { PropsWithChildren } from "react";

import { PrimaryNavigationDesktop } from "@/shared/features/navigation/primary-navigation/_components/primary-navigation-desktop/primary-navigation-desktop";
import { PrimaryNavigationMobile } from "@/shared/features/navigation/primary-navigation/_components/primary-navigation-mobile/primary-navigation-mobile";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

export function PrimaryNavigation({ children }: PropsWithChildren) {
  const isTablet = useIsTablet("lower");

  if (isTablet) {
    return <PrimaryNavigationMobile>{children}</PrimaryNavigationMobile>;
  }
  return <PrimaryNavigationDesktop>{children}</PrimaryNavigationDesktop>;
}

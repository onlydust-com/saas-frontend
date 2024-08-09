"use client";

import { PrimaryNavigationDesktop } from "@/shared/features/navigation/primary-navigation-desktop/primary-navigation-desktop";
import { PrimaryNavigationMobile } from "@/shared/features/navigation/primary-navigation-mobile/primary-navigation-mobile";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

export function PrimaryNavigation() {
  const isTablet = useIsTablet("lower");

  if (isTablet) {
    return <PrimaryNavigationMobile />;
  }
  return <PrimaryNavigationDesktop />;
}

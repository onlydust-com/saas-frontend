"use client";

import { Bell } from "lucide-react";

import { PageHeader } from "@/design-system/organisms/page-header";

import { SecondaryNavigationProps } from "@/shared/features/navigation/secondary-navigation/secondary-navigation.types";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

export function SecondaryNavigation({ ...props }: SecondaryNavigationProps) {
  const isTablet = useIsTablet("lower");

  if (isTablet) {
    return null;
  }

  return (
    <PageHeader
      action={{
        variant: "tertiary",
        size: "xs",
        startIcon: { component: Bell },
        iconOnly: true,
      }}
      {...props}
    />
  );
}

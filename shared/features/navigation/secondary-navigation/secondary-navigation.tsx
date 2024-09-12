"use client";

import { PageHeader } from "@/design-system/organisms/page-header";

import { SecondaryNavigationProps } from "@/shared/features/navigation/secondary-navigation/secondary-navigation.types";
import { NotificationsPopover } from "@/shared/features/notifications/notifications-popover";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

export function SecondaryNavigation({ ...props }: SecondaryNavigationProps) {
  const isTablet = useIsTablet("lower");

  if (isTablet) {
    return null;
  }

  return <PageHeader endContent={<NotificationsPopover />} {...props} />;
}

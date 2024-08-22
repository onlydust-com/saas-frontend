"use client";

import { Bell, ChevronLeft } from "lucide-react";

import { Breadcrumbs } from "@/design-system/atoms/breadcrumbs";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";

import { SecondaryNavigationProps } from "@/shared/features/navigation/secondary-navigation/secondary-navigation.types";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

export function SecondaryNavigation({ icon: Icon, breadcrumbs, onBack }: SecondaryNavigationProps) {
  const isTablet = useIsTablet("lower");

  if (isTablet) {
    return null;
  }

  return (
    <Paper
      as={"header"}
      size={"s"}
      container={"2"}
      border={"none"}
      classNames={{ base: "flex justify-between items-center gap-3" }}
    >
      <div className={"flex items-center gap-2"}>
        {onBack ? (
          <Button variant={"secondary-light"} size={"l"} startIcon={ChevronLeft} hideText onClick={onBack} />
        ) : null}
        <Icon size={24} />
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div>
        <Button variant={"secondary-light"} size={"l"} startIcon={Bell} hideText />
      </div>
    </Paper>
  );
}

"use client";

import { Breadcrumbs } from "@/design-system/atoms/breadcrumbs";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";

import { SecondaryNavigationTypes } from "@/shared/features/navigation/secondary-navigation/secondary-navigation.types";

export function SecondaryNavigation({ iconName, breadcrumbs, onBack }: SecondaryNavigationTypes) {
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
          <Button
            variant={"secondary-light"}
            size={"l"}
            startIcon={{ name: "ri-arrow-left-s-line" }}
            hideText
            onClick={onBack}
          />
        ) : null}
        <Icon name={iconName} size={24} />
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div>
        <Button variant={"secondary-light"} size={"l"} startIcon={{ name: "ri-notification-3-line" }} hideText />
      </div>
    </Paper>
  );
}

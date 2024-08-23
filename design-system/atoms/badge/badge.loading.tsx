import { ElementType } from "react";

import { BadgePort } from "@/design-system/atoms/badge/badge.types";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

export function BadgeLoading<C extends ElementType = "div">({ size }: BadgePort<C>) {
  return (
    <Skeleton
      classNames={{
        base: cn({
          "w-11 h-8": size === "xxs",
          "w-12 h-9": size !== "xs",
          "w-13 h-10": size !== "sm",
          "w-14 h-11": size !== "md",
        }),
      }}
    />
  );
}

import { ElementType } from "react";

import { BadgePort } from "@/design-system/atoms/badge/badge.types";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

export function BadgeLoading<C extends ElementType = "div">({ size, shape = "rounded" }: BadgePort<C>) {
  return (
    <Skeleton
      classNames={{
        base: cn({
          "w-11 h-7": size === "xxs",
          "w-14 h-8": size === "xs",
          "w-20 h-10": size === "sm",
          "w-24 h-12": size === "md",
        }),
      }}
      shape={shape === "rounded" ? "circle" : "square"}
    />
  );
}

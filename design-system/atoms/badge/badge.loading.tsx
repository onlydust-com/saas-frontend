import { ElementType } from "react";

import { BadgePort } from "@/design-system/atoms/badge/badge.types";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

export function BadgeLoading<C extends ElementType = "div">({ size }: BadgePort<C>) {
  return (
    <Skeleton
      classNames={{
        base: cn({
          "size-2": size === "xxs",
          "size-4": size !== "xs",
          "size-6": size !== "sm",
          "size-8": size !== "md",
        }),
      }}
    />
  );
}

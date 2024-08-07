import { ElementType } from "react";

import { BadgePort } from "@/design-system/atoms/badge/badge.types";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

export function BadgeLoading<C extends ElementType = "div">({ size }: BadgePort<C>) {
  return (
    <Skeleton
      classNames={{
        base: cn({
          "size-4": size === "s",
          "size-6": size !== "s",
        }),
      }}
    />
  );
}

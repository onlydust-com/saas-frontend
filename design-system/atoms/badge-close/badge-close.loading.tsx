import { ElementType } from "react";

import { BadgePort } from "@/design-system/atoms/badge/badge.types";
import { Skeleton } from "@/design-system/atoms/skeleton";

export function BadgeCloseLoading<C extends ElementType = "div">(_: BadgePort<C>) {
  return (
    <Skeleton
      classNames={{
        base: "size-2",
      }}
    />
  );
}

import { Skeleton } from "@nextui-org/react";

import { cn } from "@/shared/helpers/cn";

import { SkeletonPort } from "../../skeleton.types";
import { SkeletonNextUiVariants } from "./next-ui.variants";

export function SkeletonNextUiAdapter({ classNames, shape }: SkeletonPort) {
  const slots = SkeletonNextUiVariants({ shape });

  return (
    <Skeleton
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
    />
  );
}

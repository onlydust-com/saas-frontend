import { useMemo } from "react";

import { cn } from "@/shared/helpers/cn";

import { IconSizeMap } from "../../icon.constants";
import { LucideIconPort } from "../../icon.types";
import { IconLucideVariants } from "./lucide.variants";

export function IconLucideAdapter({ component: Icon, classNames, size = "sm" }: LucideIconPort) {
  const { base } = IconLucideVariants();

  const { stroke, width } = useMemo(
    () => ({
      stroke: IconSizeMap.stroke[size],
      width: IconSizeMap.width[size],
    }),
    [size]
  );

  return <Icon size={width} strokeWidth={stroke} className={cn(base(), classNames?.base)} />;
}

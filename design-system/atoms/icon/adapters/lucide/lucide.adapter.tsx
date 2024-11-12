import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { cn } from "@/shared/helpers/cn";

import { IconSizeMap } from "../../icon.constants";
import { LucideIconPort } from "../../icon.types";
import { IconLucideVariants } from "./lucide.variants";

export function IconLucideAdapter({ component: Icon, classNames, size = "sm" }: LucideIconPort) {
  const { base } = IconLucideVariants();

  const styleKernelPort = bootstrap.getStyleKernelPort();

  const { stroke, width } = useMemo(
    () => ({
      stroke: IconSizeMap.stroke[size],
      width: IconSizeMap.width[size],
    }),
    [size]
  );

  return (
    <Icon
      size={styleKernelPort.pxToRem(width)}
      strokeWidth={styleKernelPort.pxToRem(stroke)}
      className={cn(base(), classNames?.base)}
    />
  );
}

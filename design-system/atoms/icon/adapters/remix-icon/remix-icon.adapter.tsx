import { useMemo } from "react";

import { IconSizeMap } from "@/design-system/atoms/icon/icon.constants";

import { cn } from "@/shared/helpers/cn";

import { RemixIconPort } from "../../icon.types";
import { IconRemixIconVariants } from "./remix-icon.variants";

export function IconRemixIconAdapter({ classNames, name, size = "sm", color, ...props }: RemixIconPort) {
  const { base } = IconRemixIconVariants();

  const { width } = useMemo(
    () => ({
      width: IconSizeMap.width[size],
    }),
    [size]
  );

  return (
    <span className={cn(base(), classNames?.base)} {...props}>
      <i
        className={name}
        style={{
          fontSize: `${width}px`,
          lineHeight: 1,
          color,
        }}
      />
    </span>
  );
}

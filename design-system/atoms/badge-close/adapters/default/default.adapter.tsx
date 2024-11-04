import { X } from "lucide-react";
import { ElementType } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgeClosePort } from "@/design-system/atoms/badge-close/badge-close.types";
import { Icon, IconSize } from "@/design-system/atoms/icon";

import { cn } from "@/shared/helpers/cn";

import { BadgeCloseDefaultVariants } from "./default.variants";

export function BadgeCloseDefaultAdapter<C extends ElementType = "button">({
  classNames,
  as,
  htmlProps,
  shape,
  color,
  onClose,
  variant,
  size = "sm",
}: BadgeClosePort<C>) {
  const Component = as || "button";

  const slots = BadgeCloseDefaultVariants({ color, shape, size, variant });

  const iconSizeMapping: Record<NonNullable<BadgeClosePort<AnyType>["size"]>, IconSize> = {
    xxs: "xxs",
    xs: "xxs",
    sm: "sm",
    md: "md",
  };
  return (
    <Component {...htmlProps} onClick={onClose} className={cn(slots.base(), classNames?.base)} data-clickable={true}>
      <Icon
        component={X}
        size={iconSizeMapping[size]}
        classNames={{ base: cn(slots.closeIcon(), classNames?.closeIcon) }}
      />
    </Component>
  );
}

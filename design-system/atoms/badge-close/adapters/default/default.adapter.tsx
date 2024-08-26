import { X } from "lucide-react";
import { ElementType } from "react";

import { BadgeClosePort } from "@/design-system/atoms/badge-close/badge-close.types";
import { Icon } from "@/design-system/atoms/icon";

import { cn } from "@/shared/helpers/cn";

import { BadgeCloseDefaultVariants } from "./default.variants";

export function BadgeCloseDefaultAdapter<C extends ElementType = "button">({
  classNames,
  as,
  htmlProps,
  shape,
  color,
  onClose,
}: BadgeClosePort<C>) {
  const Component = as || "button";

  const slots = BadgeCloseDefaultVariants({ color, shape });

  return (
    <Component {...htmlProps} onClick={onClose} className={cn(slots.base(), classNames?.base)} data-clickable={true}>
      <Icon component={X} size={"xs"} classNames={{ base: cn(slots.closeIcon(), classNames?.closeIcon) }} />
    </Component>
  );
}

import { Lock } from "lucide-react";
import { ElementType } from "react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TabItemPort } from "../../tab-item.types";
import { TabItemDefaultVariants } from "./default.variants";

export function TabItemDefaultAdapter<C extends ElementType = "button">({
  as,
  htmlProps,
  classNames,
  variant = "flat",
  size = "sm",
  startIcon,
  endIcon,
  badge,
  isSelected = false,
  children,
  attr = {},
  id,
  isLocked,
  onClick,
}: TabItemPort<C>) {
  const Component = as || "button";
  const slots = TabItemDefaultVariants({ variant, size, isSelected });

  function handleClick() {
    onClick?.(id);
  }

  return (
    <Component {...attr} {...htmlProps} className={cn(slots.base(), classNames?.base)} onClick={handleClick}>
      {!isLocked && startIcon && (
        <Icon
          size={"sm"}
          {...startIcon}
          classNames={{
            ...startIcon?.classNames,
            base: cn(slots.startIcon(), classNames?.startIcon, startIcon.classNames?.base),
          }}
        />
      )}
      {isLocked && (
        <Icon
          size={"sm"}
          component={Lock}
          classNames={{
            ...startIcon?.classNames,
            base: cn(slots.startIcon(), classNames?.startIcon),
          }}
        />
      )}
      {!!children && (
        <Typo
          size={"sm"}
          classNames={{
            base: cn(slots.label(), classNames?.label),
          }}
        >
          {children}
        </Typo>
      )}
      {endIcon && (
        <Icon
          size={"sm"}
          {...endIcon}
          classNames={{
            ...endIcon?.classNames,
            base: cn(slots.endIcon(), classNames?.endIcon, endIcon.classNames?.base),
          }}
        />
      )}
      {badge && (
        <Badge
          size={"xxs"}
          {...badge}
          classNames={{
            ...badge?.classNames,
            base: cn(slots.badge(), classNames?.badge, badge.classNames?.base),
            content: cn(slots.badgeContent(), badge.classNames?.content),
          }}
        />
      )}
    </Component>
  );
}

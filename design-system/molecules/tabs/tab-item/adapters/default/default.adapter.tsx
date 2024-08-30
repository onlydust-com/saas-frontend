import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TabItemPort } from "../../tab-item.types";
import { TabItemDefaultVariants } from "./default.variants";

export function TabItemDefaultAdapter({
  classNames,
  variant = "flat",
  size = "sm",
  startIcon,
  badge,
  isSelected = false,
  children,
  attr = {},
  id,
  onClick,
}: TabItemPort) {
  const slots = TabItemDefaultVariants({ variant, size, isSelected });

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <button {...attr} className={cn(slots.base(), classNames?.base)} onClick={handleClick}>
      {startIcon && (
        <Icon
          size={"sm"}
          {...startIcon}
          classNames={{
            ...startIcon?.classNames,
            base: cn(slots.startIcon(), classNames?.startIcon, startIcon.classNames?.base),
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
    </button>
  );
}

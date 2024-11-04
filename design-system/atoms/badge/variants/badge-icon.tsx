import { ElementType } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgeIconPort } from "@/design-system/atoms/badge";
import { BadgeClosePort } from "@/design-system/atoms/badge-close";
import { Icon, IconSize } from "@/design-system/atoms/icon";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { BadgeDefaultAdapter } from "../adapters/default/default.adapter";

export function BadgeIcon<C extends ElementType = "span">({ icon, ...props }: BadgeIconPort<C>) {
  const iconSizeMapping: Record<NonNullable<BadgeClosePort<AnyType>["size"]>, IconSize> = {
    xxs: "xxs",
    xs: "xxs",
    sm: "sm",
    md: "md",
    lg: "md",
    xl: "md",
  };

  return withComponentAdapter<Omit<BadgeIconPort<C>, "icon">>(BadgeDefaultAdapter)({
    ...props,
    startContent: (
      <Icon
        size={iconSizeMapping[props.size ?? "sm"]}
        {...icon}
        classNames={{
          base: cn("text-inherit flex-none", icon.classNames?.base),
        }}
      />
    ),
  });
}

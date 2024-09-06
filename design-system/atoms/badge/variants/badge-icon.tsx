import { ElementType } from "react";

import { BadgeIconPort } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { BadgeDefaultAdapter } from "../adapters/default/default.adapter";

export function BadgeIcon<C extends ElementType = "span">({ icon, ...props }: BadgeIconPort<C>) {
  return withComponentAdapter<Omit<BadgeIconPort<C>, "icon">>(BadgeDefaultAdapter)({
    ...props,
    startContent: (
      <Icon
        {...icon}
        classNames={{
          base: cn("text-inherit", icon.classNames?.base),
        }}
      />
    ),
  });
}

import { ElementType } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagIconPort } from "../tag.types";

export function TagIcon<C extends ElementType = "span">({ icon, ...props }: TagIconPort<C>) {
  return withComponentAdapter<Omit<TagIconPort<C>, "icon">>(TagDefaultAdapter)({
    ...props,
    startContent: (
      <Icon
        {...icon}
        classNames={{
          base: cn("text-inherit", icon.className),
        }}
      />
    ),
  });
}

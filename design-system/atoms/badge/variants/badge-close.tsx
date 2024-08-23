import { ElementType } from "react";

import { BadgeClosePort } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { BadgeDefaultAdapter } from "../adapters/default/default.adapter";

export function BadgeClose<C extends ElementType = "button">({ ...props }: BadgeClosePort<C>) {
  return withComponentAdapter<BadgeClosePort<"button">>(BadgeDefaultAdapter)({
    ...props,
    startContent: (
      <Icon
        name="ri-close-line"
        classNames={{
          base: "text-inherit",
        }}
      />
    ),
    endContent: undefined,
    children: undefined,
    isDeletable: false,
    as: "button",
    htmlProps: {
      onClick: props.onClose,
    },
    classNames: {
      ...props.classNames,
      base: cn("p-0.5", props.classNames?.base),
    },
  });
}

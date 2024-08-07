import { ElementType } from "react";

import { BadgeDefaultAdapter } from "@/design-system/atoms/badge/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { BadgeDotPortDot } from "../badge.types";

export function BadgeDot<C extends ElementType = "div">(props: BadgeDotPortDot<C>) {
  return withComponentAdapter<BadgeDotPortDot<C>>(BadgeDefaultAdapter)({
    ...props,
    hideContent: true,
    classNames: {
      ...(props?.classNames || {}),
      base: cn("min-h-2 min-w-2 h-2 w-2 rounded-full p-0", props?.classNames?.base),
    },
  });
}

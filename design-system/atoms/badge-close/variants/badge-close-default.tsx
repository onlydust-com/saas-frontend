import { ElementType } from "react";

import { BadgeCloseDefaultAdapter } from "@/design-system/atoms/badge-close/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { BadgeClosePort } from "../badge-close.types";

export function BadgeClose<C extends ElementType = "button">(props: BadgeClosePort<C>) {
  return withComponentAdapter<BadgeClosePort<C>>(BadgeCloseDefaultAdapter)(props);
}

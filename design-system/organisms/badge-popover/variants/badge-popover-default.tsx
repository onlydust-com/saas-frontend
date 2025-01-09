import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { BadgePopoverDefaultAdapter } from "../adapters/default/default.adapter";
import { BadgePopoverPort } from "../badge-popover.types";

export function BadgePopover<C extends ElementType = "div">(props: BadgePopoverPort<C>) {
  return withComponentAdapter<BadgePopoverPort<C>>(BadgePopoverDefaultAdapter)(props);
}

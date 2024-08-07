import { ElementType } from "react";

import { BadgeDefaultAdapter } from "@/design-system/atoms/badge/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { BadgePort } from "../badge.types";

export function Badge<C extends ElementType = "div">(props: BadgePort<C>) {
  return withComponentAdapter<BadgePort<C>>(BadgeDefaultAdapter)(props);
}

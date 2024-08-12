import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AvatarGroupDescriptionDefaultAdapter } from "../adapters/default/default.adapter";
import { AvatarGroupDescriptionPort } from "../avatar-group-description.types";

export function AvatarGroupDescription<C extends ElementType = "div">(props: AvatarGroupDescriptionPort<C>) {
  return withComponentAdapter<AvatarGroupDescriptionPort<C>>(AvatarGroupDescriptionDefaultAdapter)(props);
}

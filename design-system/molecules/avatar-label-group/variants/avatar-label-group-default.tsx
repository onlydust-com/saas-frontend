import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AvatarLabelGroupDefaultAdapter } from "../adapters/default/default.adapter";
import { AvatarLabelGroupPort } from "../avatar-label-group.types";

export function AvatarLabelGroup<C extends ElementType = "div">(props: AvatarLabelGroupPort<C>) {
  return withComponentAdapter<AvatarLabelGroupPort<C>>(AvatarLabelGroupDefaultAdapter)(props);
}

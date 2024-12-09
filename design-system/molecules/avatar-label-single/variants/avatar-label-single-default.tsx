import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AvatarLabelSingleDefaultAdapter } from "../adapters/default/default.adapter";
import { AvatarLabelSinglePort } from "../avatar-label-single.types";

export function AvatarLabelSingle<C extends ElementType = "div">(props: AvatarLabelSinglePort<C>) {
  return withComponentAdapter<AvatarLabelSinglePort<C>>(AvatarLabelSingleDefaultAdapter)(props);
}

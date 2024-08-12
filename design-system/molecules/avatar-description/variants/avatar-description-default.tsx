import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AvatarDescriptionDefaultAdapter } from "../adapters/default/default.adapter";
import { AvatarDescriptionPort } from "../avatar-description.types";

export function AvatarDescription(props: AvatarDescriptionPort) {
  return withComponentAdapter<AvatarDescriptionPort>(AvatarDescriptionDefaultAdapter)(props);
}

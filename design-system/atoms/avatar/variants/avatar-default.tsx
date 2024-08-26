import { AvatarDefaultAdapter } from "@/design-system/atoms/avatar/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AvatarPort } from "../avatar.types";

export function Avatar(props: AvatarPort) {
  return withComponentAdapter<AvatarPort>(AvatarDefaultAdapter)(props);
}

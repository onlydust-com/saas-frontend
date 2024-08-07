import { AvatarNextUiAdapter } from "@/design-system/atoms/avatar/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

// KEEP RELATIVE FOR STORYBOOK AUTODOCS
import { AvatarPort } from "../avatar.types";

export function Avatar(props: AvatarPort) {
  return withComponentAdapter<AvatarPort>(AvatarNextUiAdapter)(props);
}

import { AvatarPort } from "@/design-system/atoms/avatar/avatar.types";

import { AvatarGroupPort } from "./avatar-group.types";

export function getAvatarImageSize(size: AvatarGroupPort<"div">["size"]): AvatarPort["size"] {
  switch (size) {
    case "md":
      return "lg";
    case "sm":
      return "md";
    case "xs":
      return "sm";

    default:
      return "md";
  }
}

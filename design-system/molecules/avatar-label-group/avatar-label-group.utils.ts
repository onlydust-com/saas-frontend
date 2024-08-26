import { AvatarGroupPort } from "@/design-system/molecules/avatar-group/avatar-group.types";

import { AvatarLabelGroupPort } from "./avatar-label-group.types";

export function getAvatarImageSize(size: AvatarLabelGroupPort<"div">["size"]): AvatarGroupPort<"div">["size"] {
  switch (size) {
    case "md":
      return "sm";
    case "lg":
      return "md";

    default:
      return "sm";
  }
}

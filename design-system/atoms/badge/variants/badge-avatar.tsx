import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { BadgeAvatarPort } from "@/design-system/atoms/badge";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { BadgeDefaultAdapter } from "../adapters/default/default.adapter";

export function BadgeAvatar<C extends ElementType = "span">({ avatar, ...props }: BadgeAvatarPort<C>) {
  return withComponentAdapter<Omit<BadgeAvatarPort<C>, "avatar">>(BadgeDefaultAdapter)({
    ...props,
    startContent: <Avatar size={"xxs"} {...avatar} />,
  });
}

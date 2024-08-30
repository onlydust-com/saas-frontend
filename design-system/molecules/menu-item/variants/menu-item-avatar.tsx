import { Avatar } from "@/design-system/atoms/avatar";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { MenuItemNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { MenuItemAvatarPort, MenuItemPort } from "../menu-item.types";

export function MenuItemAvatar({ avatar, ...props }: MenuItemAvatarPort) {
  return withComponentAdapter<MenuItemPort>(MenuItemNextUiAdapter)({
    ...props,
    startContent: <Avatar size={"xxs"} {...avatar} />,
  });
}

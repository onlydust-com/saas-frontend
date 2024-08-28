import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { isMenuItemAvatar } from "@/design-system/molecules/menu-item/menu-item.utils";
import { MenuItemAvatar } from "@/design-system/molecules/menu-item/variants/menu-item-avatar";

import { MenuItemNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { MenuItemPort } from "../menu-item.types";

export function MenuItem(props: MenuItemPort) {
  if (isMenuItemAvatar(props)) return <MenuItemAvatar {...props} />;

  return withComponentAdapter<MenuItemPort>(MenuItemNextUiAdapter)(props);
}

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import {
  isMenuItemAvatar,
  isMenuItemCheckbox,
  isMenuItemIcon,
  isMenuItemRadio,
} from "@/design-system/molecules/menu-item/menu-item.utils";
import { MenuItemAvatar } from "@/design-system/molecules/menu-item/variants/menu-item-avatar";
import { MenuItemCheckbox } from "@/design-system/molecules/menu-item/variants/menu-item-checkbox";
import { MenuItemIcon } from "@/design-system/molecules/menu-item/variants/menu-item-icon";
import { MenuItemRadio } from "@/design-system/molecules/menu-item/variants/menu-item-radio";

import { MenuItemNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { MenuItemPort } from "../menu-item.types";

export function MenuItem(props: MenuItemPort) {
  if (isMenuItemAvatar(props)) return <MenuItemAvatar {...props} />;

  if (isMenuItemIcon(props)) return <MenuItemIcon {...props} />;

  if (isMenuItemCheckbox(props)) return <MenuItemCheckbox {...props} />;

  if (isMenuItemRadio(props)) return <MenuItemRadio {...props} />;

  return withComponentAdapter<MenuItemPort>(MenuItemNextUiAdapter)(props);
}

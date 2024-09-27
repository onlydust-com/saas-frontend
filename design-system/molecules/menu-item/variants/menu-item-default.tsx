import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { MenuItemDefaultAdapter } from "@/design-system/molecules/menu-item/adapters/default/default.adapter";
import {
  isMenuItemAvatar,
  isMenuItemCheckbox,
  isMenuItemIcon,
  isMenuItemLabel,
  isMenuItemRadio,
  isMenuItemSeparator,
} from "@/design-system/molecules/menu-item/menu-item.utils";
import { MenuItemAvatar } from "@/design-system/molecules/menu-item/variants/menu-item-avatar";
import { MenuItemCheckbox } from "@/design-system/molecules/menu-item/variants/menu-item-checkbox";
import { MenuItemIcon } from "@/design-system/molecules/menu-item/variants/menu-item-icon";
import { MenuItemLabel } from "@/design-system/molecules/menu-item/variants/menu-item-label";
import { MenuItemRadio } from "@/design-system/molecules/menu-item/variants/menu-item-radio";
import { MenuItemSeparator } from "@/design-system/molecules/menu-item/variants/menu-item-separator";

import { MenuItemPort } from "../menu-item.types";

export function MenuItem<T = string>(props: MenuItemPort<T>) {
  if (isMenuItemAvatar(props)) return <MenuItemAvatar {...props} />;

  if (isMenuItemIcon(props)) return <MenuItemIcon {...props} />;

  if (isMenuItemCheckbox(props)) return <MenuItemCheckbox {...props} />;

  if (isMenuItemRadio(props)) return <MenuItemRadio {...props} />;

  if (isMenuItemLabel(props)) return <MenuItemLabel {...props} />;

  if (isMenuItemSeparator(props)) return <MenuItemSeparator {...props} />;

  return withComponentAdapter<MenuItemPort<T>>(MenuItemDefaultAdapter)(props);
}

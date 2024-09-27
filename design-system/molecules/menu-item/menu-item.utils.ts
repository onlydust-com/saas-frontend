import { AnyType } from "@/core/kernel/types";

import {
  MenuItemAvatarPort,
  MenuItemCheckboxPort,
  MenuItemIconPort,
  MenuItemLabelPort,
  MenuItemPort,
  MenuItemRadioPort,
  MenuItemSeparatorPort,
} from "@/design-system/molecules/menu-item/menu-item.types";

export function isMenuItemAvatar(menuItem: MenuItemPort<AnyType>): menuItem is MenuItemAvatarPort {
  return (menuItem as MenuItemAvatarPort).avatar !== undefined;
}

export function isMenuItemIcon(menuItem: MenuItemPort<AnyType>): menuItem is MenuItemIconPort {
  return (menuItem as MenuItemIconPort).icon !== undefined;
}

export function isMenuItemCheckbox(menuItem: MenuItemPort<AnyType>): menuItem is MenuItemCheckboxPort {
  return (menuItem as MenuItemCheckboxPort).isCheckbox !== undefined;
}

export function isMenuItemRadio(menuItem: MenuItemPort<AnyType>): menuItem is MenuItemRadioPort {
  return (menuItem as MenuItemRadioPort).isRadio !== undefined;
}

export function isMenuItemLabel(menuItem: MenuItemPort<AnyType>): menuItem is MenuItemLabelPort {
  return (menuItem as MenuItemLabelPort).isLabel !== undefined;
}

export function isMenuItemSeparator(menuItem: MenuItemPort<AnyType>): menuItem is MenuItemSeparatorPort {
  return (menuItem as MenuItemSeparatorPort).isSeparator !== undefined;
}

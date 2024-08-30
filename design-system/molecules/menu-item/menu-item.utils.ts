import {
  MenuItemAvatarPort,
  MenuItemCheckboxPort,
  MenuItemIconPort,
  MenuItemPort,
  MenuItemRadioPort,
} from "@/design-system/molecules/menu-item/menu-item.types";

export function isMenuItemAvatar(menuItem: MenuItemPort): menuItem is MenuItemAvatarPort {
  return (menuItem as MenuItemAvatarPort).avatar !== undefined;
}

export function isMenuItemIcon(menuItem: MenuItemPort): menuItem is MenuItemIconPort {
  return (menuItem as MenuItemIconPort).icon !== undefined;
}

export function isMenuItemCheckbox(menuItem: MenuItemPort): menuItem is MenuItemCheckboxPort {
  return (menuItem as MenuItemCheckboxPort).isCheckbox !== undefined;
}

export function isMenuItemRadio(menuItem: MenuItemPort): menuItem is MenuItemRadioPort {
  return (menuItem as MenuItemRadioPort).isRadio !== undefined;
}

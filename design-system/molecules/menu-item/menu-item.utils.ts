import {
  MenuItemAvatarPort,
  MenuItemCheckboxPort,
  MenuItemIconPort,
  MenuItemPort,
  MenuItemRadioPort,
} from "@/design-system/molecules/menu-item/menu-item.types";

export function isMenuItemAvatar(tag: MenuItemPort): tag is MenuItemAvatarPort {
  return (tag as MenuItemAvatarPort).avatar !== undefined;
}

export function isMenuItemIcon(tag: MenuItemPort): tag is MenuItemIconPort {
  return (tag as MenuItemIconPort).icon !== undefined;
}

export function isMenuItemCheckbox(tag: MenuItemPort): tag is MenuItemCheckboxPort {
  return (tag as MenuItemCheckboxPort).isCheckbox !== undefined;
}

export function isMenuItemRadio(tag: MenuItemPort): tag is MenuItemRadioPort {
  return (tag as MenuItemRadioPort).isRadio !== undefined;
}

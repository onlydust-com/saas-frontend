import { MenuItemAvatarPort, MenuItemPort } from "@/design-system/molecules/menu-item/menu-item.types";

export function isMenuItemAvatar(tag: MenuItemPort): tag is MenuItemAvatarPort {
  return (tag as MenuItemAvatarPort).avatar !== undefined;
}

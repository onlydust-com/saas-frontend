import { ListMenuPort, MenuPort, PopOverMenuPort } from "@/design-system/molecules/menu/menu.types";

export function isMenuPopOver(menu: MenuPort): menu is PopOverMenuPort {
  return (menu as PopOverMenuPort).isPopOver !== undefined;
}

export function isMenuList(menu: MenuPort): menu is ListMenuPort {
  return (menu as ListMenuPort).isPopOver === undefined;
}

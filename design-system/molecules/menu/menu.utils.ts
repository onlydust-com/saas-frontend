import { AnyType } from "@/core/kernel/types";

import { ListMenuPort, MenuPort, PopOverMenuPort } from "@/design-system/molecules/menu/menu.types";

export function isMenuPopOver(menu: MenuPort<AnyType>): menu is PopOverMenuPort<AnyType> {
  return (menu as PopOverMenuPort).isPopOver !== undefined;
}

export function isMenuList(menu: MenuPort<AnyType>): menu is ListMenuPort<AnyType> {
  return (menu as ListMenuPort).isPopOver === undefined;
}

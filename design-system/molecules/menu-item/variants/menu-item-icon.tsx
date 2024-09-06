import { Icon } from "@/design-system/atoms/icon";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { MenuItemDefaultAdapter } from "@/design-system/molecules/menu-item/adapters/default/default.adapter";

import { MenuItemIconPort, MenuItemPort } from "../menu-item.types";

export function MenuItemIcon({ icon, ...props }: MenuItemIconPort) {
  return withComponentAdapter<MenuItemPort>(MenuItemDefaultAdapter)({
    ...props,
    startContent: <Icon size={"sm"} {...icon} />,
  });
}

import { Icon } from "@/design-system/atoms/icon";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { MenuItemNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { MenuItemIconPort, MenuItemPort } from "../menu-item.types";

export function MenuItemIcon({ icon, ...props }: MenuItemIconPort) {
  return withComponentAdapter<MenuItemPort>(MenuItemNextUiAdapter)({
    ...props,
    startContent: <Icon size={"sm"} {...icon} />,
  });
}

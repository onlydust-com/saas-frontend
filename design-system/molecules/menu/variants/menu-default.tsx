import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { MenuDefaultAdapter } from "@/design-system/molecules/menu/adapters/default/default.adapter";
import { isMenuPopOver } from "@/design-system/molecules/menu/menu.utils";
import { MenuPopover } from "@/design-system/molecules/menu/variants/menu-popover";

import { ListMenuPort, MenuPort } from "../menu.types";

export function Menu(props: MenuPort) {
  if (isMenuPopOver(props)) {
    return <MenuPopover {...props} />;
  }
  return withComponentAdapter<ListMenuPort>(MenuDefaultAdapter)(props);
}

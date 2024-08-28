import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { MenuNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { MenuPort } from "../menu.types";

export function Menu(props: MenuPort) {
  return withComponentAdapter<MenuPort>(MenuNextUiAdapter)(props);
}

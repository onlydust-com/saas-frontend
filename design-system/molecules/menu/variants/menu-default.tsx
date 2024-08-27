import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { MenuNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { MenuPort } from "../menu.types";

export function Menu<C extends ElementType = "div">(props: MenuPort<C>) {
  return withComponentAdapter<MenuPort<C>>(MenuNextUiAdapter)(props);
}

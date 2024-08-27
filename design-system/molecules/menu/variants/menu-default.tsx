import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { MenuDefaultAdapter } from "../adapters/default/default.adapter";

import { MenuPort } from "../menu.types";

export function Menu<C extends ElementType = "div">(props: MenuPort<C>) {
  return withComponentAdapter<MenuPort<C>>(MenuDefaultAdapter)(props);
}

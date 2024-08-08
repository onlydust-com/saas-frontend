import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ItemNavDefaultAdapter } from "../adapters/default/default.adapter";

import { ItemNavPort } from "../item-nav.types";

export function ItemNav<C extends ElementType = "div">(props: ItemNavPort<C>) {
  return withComponentAdapter<ItemNavPort<C>>(ItemNavDefaultAdapter)(props);
}

import { ItemNavDefaultAdapter } from "design-system/molecules/item-nav/adapters/default/default.adapter";
import { ItemNavPort } from "design-system/molecules/item-nav/item-nav.types";
import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

export function ItemNav<C extends ElementType = "div">(props: ItemNavPort<C>) {
  return withComponentAdapter<ItemNavPort<C>>(ItemNavDefaultAdapter)(props);
}

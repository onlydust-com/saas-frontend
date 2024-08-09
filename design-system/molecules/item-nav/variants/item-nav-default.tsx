import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ItemNavDefaultAdapter } from "../adapters/default/default.adapter";
import { ItemNavPort } from "../item-nav.types";

export function ItemNav(props: ItemNavPort) {
  return withComponentAdapter(ItemNavDefaultAdapter)(props);
}

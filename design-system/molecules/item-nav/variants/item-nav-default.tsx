import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { ItemNavPort } from "@/design-system/molecules/item-nav";
import { ItemNavDefaultAdapter } from "@/design-system/molecules/item-nav/adapters/default/default.adapter";

export function ItemNav(props: ItemNavPort) {
  return withComponentAdapter(ItemNavDefaultAdapter)(props);
}

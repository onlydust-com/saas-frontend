import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TabItemDefaultAdapter } from "../adapters/default/default.adapter";
import { TabItemPort } from "../tab-item.types";

export function TabItem(props: TabItemPort) {
  return withComponentAdapter<TabItemPort>(TabItemDefaultAdapter)(props);
}

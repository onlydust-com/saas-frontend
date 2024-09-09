import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TabItemDefaultAdapter } from "../adapters/default/default.adapter";
import { TabItemPort } from "../tab-item.types";

export function TabItem<C extends ElementType = "button">(props: TabItemPort<C>) {
  return withComponentAdapter<TabItemPort<C>>(TabItemDefaultAdapter)(props);
}

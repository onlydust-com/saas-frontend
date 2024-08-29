import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TabsDefaultAdapter } from "../adapters/default/default.adapter";

import { TabsPort } from "../tabs.types";

export function Tabs<C extends ElementType = "div">(props: TabsPort<C>) {
  return withComponentAdapter<TabsPort<C>>(TabsDefaultAdapter)(props);
}

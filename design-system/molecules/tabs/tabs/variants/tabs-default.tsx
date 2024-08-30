import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TabsDefaultAdapter } from "../adapters/default/default.adapter";
import { TabsPort } from "../tabs.types";

export function Tabs(props: TabsPort) {
  return withComponentAdapter<TabsPort>(TabsDefaultAdapter)(props);
}

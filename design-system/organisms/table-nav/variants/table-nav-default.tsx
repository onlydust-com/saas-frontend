import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableNavDefaultAdapter } from "../adapters/default/default.adapter";
import { TableNavPort } from "../table-nav.types";

export function TableNav(props: TableNavPort) {
  return withComponentAdapter<TableNavPort>(TableNavDefaultAdapter)(props);
}

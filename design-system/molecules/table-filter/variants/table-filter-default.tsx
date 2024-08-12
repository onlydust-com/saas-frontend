import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableFilterDefaultAdapter } from "../adapters/default/default.adapter";
import { TableFilterPort } from "../table-filter.types";

export function TableFilter(props: TableFilterPort) {
  return withComponentAdapter<TableFilterPort>(TableFilterDefaultAdapter)(props);
}

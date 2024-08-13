import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableGroupByDefaultAdapter } from "../adapters/default/default.adapter";
import { TableGroupByPort } from "../table-group-by.types";

export function TableGroupBy(props: TableGroupByPort) {
  return withComponentAdapter<TableGroupByPort>(TableGroupByDefaultAdapter)(props);
}

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableSortDefaultAdapter } from "../adapters/default/default.adapter";
import { TableSortPort } from "../table-sort.types";

export function TableSort(props: TableSortPort) {
  return withComponentAdapter<TableSortPort>(TableSortDefaultAdapter)(props);
}

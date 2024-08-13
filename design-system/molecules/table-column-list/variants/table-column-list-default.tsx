import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableColumnListDefaultAdapter } from "../adapters/default/default.adapter";
import { TableColumnListPort } from "../table-column-list.types";

export function TableColumnList(props: TableColumnListPort) {
  return withComponentAdapter<TableColumnListPort>(TableColumnListDefaultAdapter)(props);
}

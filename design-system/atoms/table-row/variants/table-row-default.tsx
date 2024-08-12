import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableRowReactTableAdapter } from "../adapters/react-table/react-table.adapter";
import { TableRowPort } from "../table-row.types";

export function TableRow(props: TableRowPort) {
  return withComponentAdapter<TableRowPort>(TableRowReactTableAdapter)(props);
}

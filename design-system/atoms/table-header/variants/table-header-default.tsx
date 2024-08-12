import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableHeaderReactTableAdapter } from "../adapters/react-table/react-table.adapter";
import { TableHeaderPort } from "../table-header.types";

export function TableHeader(props: TableHeaderPort) {
  return withComponentAdapter<TableHeaderPort>(TableHeaderReactTableAdapter)(props);
}

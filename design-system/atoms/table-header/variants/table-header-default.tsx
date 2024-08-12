import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableHeaderReactTableAdapter } from "../adapters/react-table/react-table.adapter";
import { TableHeaderPort } from "../table-header.types";

export function TableHeader<H>(props: TableHeaderPort<H>) {
  return withComponentAdapter<TableHeaderPort<H>>(TableHeaderReactTableAdapter)(props);
}

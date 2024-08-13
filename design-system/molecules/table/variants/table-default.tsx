import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableDefaultAdapter } from "../adapters/default/default.adapter";
import { TablePort } from "../table.types";

export function Table<H>(props: TablePort<H>) {
  return withComponentAdapter<TablePort<H>>(TableDefaultAdapter)(props);
}

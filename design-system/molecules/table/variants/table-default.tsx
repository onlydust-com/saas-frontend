import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableDefaultAdapter } from "../adapters/default/default.adapter";
import { TablePort } from "../table.types";

export function Table<H, R>(props: TablePort<H, R>) {
  return withComponentAdapter<TablePort<H, R>>(TableDefaultAdapter)(props);
}

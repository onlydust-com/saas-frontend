import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableSearchDefaultAdapter } from "../adapters/default/default.adapter";
import { TableSearchPort } from "../table-search.types";

export function TableSearch(props: TableSearchPort) {
  return withComponentAdapter<TableSearchPort>(TableSearchDefaultAdapter)(props);
}

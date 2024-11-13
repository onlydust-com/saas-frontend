import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableResizerDefaultAdapter } from "../adapters/default/default.adapter";
import { TableResizerPort } from "../table-resizer.types";

export function TableResizer(props: TableResizerPort) {
  return withComponentAdapter<TableResizerPort>(TableResizerDefaultAdapter)(props);
}

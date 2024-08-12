import { TableCellKpiPort } from "@/design-system/atoms/table-cell-kpi";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableCellKpiDefaultAdapter } from "../adapters/default/default.adapter";

export function TableCellKpi(props: TableCellKpiPort) {
  return withComponentAdapter<TableCellKpiPort>(TableCellKpiDefaultAdapter)(props);
}

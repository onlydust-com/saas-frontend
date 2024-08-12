import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableKpiDefaultAdapter } from "../adapters/default/default.adapter";
import { TableKpiPort } from "../table-kpi.types";

export function TableKpi(props: TableKpiPort) {
  return withComponentAdapter<TableKpiPort>(TableKpiDefaultAdapter)(props);
}

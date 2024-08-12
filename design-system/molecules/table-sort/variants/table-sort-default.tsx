import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TableSortDefaultAdapter } from "../adapters/default/default.adapter";

import { TableSortPort } from "../table-sort.types";

export function TableSort<C extends ElementType = "div">(
  props: TableSortPort<C>,
) {
  return withComponentAdapter<TableSortPort<C>>(TableSortDefaultAdapter)(props);
}

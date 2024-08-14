import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ChartLegendDefaultAdapter } from "../adapters/default/default.adapter";
import { ChartLegendPort } from "../chart-legend.types";

export function ChartLegend<C extends ElementType = "div">(props: ChartLegendPort<C>) {
  return withComponentAdapter<ChartLegendPort<C>>(ChartLegendDefaultAdapter)(props);
}

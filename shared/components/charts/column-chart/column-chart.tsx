import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { Paper } from "@/design-system/atoms/paper";

import { ColumnChartsProps } from "@/shared/components/charts/column-chart/column-chart.types";
import { cn } from "@/shared/helpers/cn";

export function ColumnChart({ className, options }: ColumnChartsProps) {
  return (
    <Paper size={"s"} border={"none"} classNames={{ base: cn("h-full w-full", className) }} container={"2"}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Paper>
  );
}

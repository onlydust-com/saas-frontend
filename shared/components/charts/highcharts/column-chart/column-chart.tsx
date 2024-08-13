import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { ColumnChartsProps } from "@/shared/components/charts/highcharts/column-chart/column-chart.types";

export function ColumnChart({ options }: ColumnChartsProps) {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

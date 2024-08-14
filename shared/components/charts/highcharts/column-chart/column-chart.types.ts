import { Options } from "highcharts";

export interface UseColumnChartOptionsParams {
  title?: string;
  categories: string[];
  series: Array<{
    name: string;
    data: number[];
  }>;
  yAxisTitle?: string;
  xAxisTitle?: string;
  tooltipFormat?: string;
  colors?: string[];
  legend?: Options["legend"];
  tooltip?: Options["tooltip"];
}

export interface UseColumnChartOptionsReturn {
  options: Options;
}

export interface ColumnChartsProps {
  options: Options;
}

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
}

export interface UseColumnChartOptionsReturn {
  options: Options;
}

export interface ColumnChartsProps {
  className?: string;
  options: Options;
}

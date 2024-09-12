import { Options } from "highcharts";

interface Marker {
  enabled: boolean;
  radius: number;
}

interface Tooltip {
  valueSuffix: string;
}

export interface HighchartsOptionsParams {
  title?: string;
  categories: string[];
  series: Array<{
    name: string;
    data: number[];
    type?: "column" | "areaspline";
    lineWidth?: number;
    marker?: Marker;
    tooltip?: Tooltip;
  }>;
  yAxisTitle?: string;
  xAxisTitle?: string;
  tooltipFormat?: string;
  colors?: string[];
  legend?: Options["legend"];
  tooltip?: Options["tooltip"];
}

export interface HighchartsOptionsReturn {
  options: Options;
}

export interface HighchartsProps {
  options: Options;
}

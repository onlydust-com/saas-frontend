import { Options } from "highcharts";

interface Marker {
  enabled: boolean;
  radius: number;
}

interface Tooltip {
  valueSuffix: string;
}

interface MapDataType {
  "iso-a2": string;
  value: number;
  color: string;
}

export interface HighchartsOptionsParams {
  title?: string;
  categories?: string[];
  series: Array<{
    name: string;
    data: number[] | MapDataType[];
    type?: "column" | "areaspline";
    lineWidth?: number;
    marker?: Marker;
    tooltip?: Tooltip;
    yAxis?: number;
    color?: string;
  }>;
  yAxisTitle?: string;
  xAxisTitle?: string;
  tooltipFormat?: string;
  colors?: string[];
  legend?: Options["legend"];
  tooltip?: Options["tooltip"];
  min?: number;
}

export interface HighchartsOptionsReturn {
  options: Options;
}

export interface HighchartsProps {
  options: Options;
  constructorType?: string;
}

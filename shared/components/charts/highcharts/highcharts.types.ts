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

export interface PieDataType {
  y: number;
  name: string;
  color: string;
}

export type HighchartsSerieData = number[] | MapDataType[] | PieDataType[];

export interface HighchartsOptionsParams {
  title?: string;
  categories?: string[];
  series: Array<{
    name: string;
    data: HighchartsSerieData;
    type?: "column" | "areaspline";
    lineWidth?: number;
    marker?: Marker;
    tooltip?: Tooltip;
    yAxis?: number;
    color?: string;
  }>;
  yAxisTitle?: string;
  xAxisTitle?: string;
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

import { HighchartsSerieData, PieDataType } from "@/shared/components/charts/highcharts/highcharts.types";

export function isPieDataType(data: HighchartsSerieData[0]): data is PieDataType {
  return (data as PieDataType).y !== undefined;
}

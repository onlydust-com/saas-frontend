import { bootstrap } from "@/core/bootstrap";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { HighchartsSerieData, PieDataType } from "@/shared/components/charts/highcharts/highcharts.types";

export function isPieDataType(data: HighchartsSerieData[0]): data is PieDataType {
  return (data as PieDataType).y !== undefined;
}

export function getPlotPeriodRange(currentDate: Date, timeGroupingType: TimeGroupingType) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  switch (timeGroupingType) {
    case "DAY":
      return {
        from: currentDate,
        to: currentDate,
      };
    case "WEEK":
      return dateKernelPort.getWeekRange(currentDate);
    case "MONTH":
    case "QUARTER":
      return dateKernelPort.getMonthRange(currentDate);
    case "YEAR":
      return dateKernelPort.getYearRange(currentDate);
    default:
      return {
        from: undefined,
        to: undefined,
      };
  }
}

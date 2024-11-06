import { Options } from "highcharts";
import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import {
  PieChartSubtitlePrimaryStyle,
  tooltipInnerStyle,
  tooltipWrapperStyle,
} from "@/shared/components/charts/highcharts/highcharts.styles";
import {
  HighchartsOptionsParams,
  HighchartsOptionsReturn,
} from "@/shared/components/charts/highcharts/highcharts.types";
import { isPieDataType } from "@/shared/components/charts/highcharts/highcharts.utils";

export const DonnutChartColors = ["#6FD195", "#537FF1", "#FFAE4C", "#8979FF", "#FF928A", "#3CC3DF"];
export function useDonnutChartOptions({
  title,
  categories,
  series,
  yAxisTitle,
  xAxisTitle,
  colors = DonnutChartColors,
  legend,
  tooltip,
  total,
  height,
}: HighchartsOptionsParams & { total: number; height?: number }): HighchartsOptionsReturn {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { amount: formattedTotal } = moneyKernelPort.format({
    amount: total,
    currency: moneyKernelPort.getCurrency("USD"),
    options: {
      maximumSignificantDigits: undefined,
    },
  });

  const options = useMemo<Options>(
    () => ({
      chart: {
        type: "pie",
        width: null,
        height,
        style: {
          padding: "0px",
        },
        backgroundColor: "transparent",
        plotBackgroundColor: "rgba(255, 255, 255, 0)",
      },
      credits: {
        enabled: false, // Disable the credits
      },
      title: {
        text: undefined,
      },
      subtitle: {
        text: formattedTotal,
        floating: true,
        verticalAlign: "middle",
        style: PieChartSubtitlePrimaryStyle,
        y: 24,
      },
      colors,
      tooltip: {
        ...tooltipWrapperStyle,
        style: tooltipInnerStyle,
        shared: true, // Enable shared tooltips
        useHTML: true, // Allow HTML formatting
        headerFormat: "<div class='font-medium mb-xs'>{point.key}</div>", // Category name
        pointFormatter() {
          const { amount, code } = moneyKernelPort.format({
            amount: this.y,
            currency: moneyKernelPort.getCurrency("USD"),
            options: {
              maximumSignificantDigits: undefined,
            },
          });

          return `<div><span class='text-typography-secondary'>${this.series.name}</span> <span class='font-medium'>${amount} ${code}</span></div>`;
        },
        outside: true,
        ...tooltip,
      },
      plotOptions: {
        pie: {
          size: "100%",
          connectorWidth: 0,
          borderWidth: 0, // Remove the border between pie slices
          innerSize: "80%", // This creates the donut effect
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: series?.map(s => ({
        type: "pie",
        name: s.name,
        data: s.data.map(d => ({
          name: isPieDataType(d) ? d.name : "",
          y: isPieDataType(d) ? d.y : 0,
          color: isPieDataType(d) ? d.color : "",
        })),
      })),
    }),
    [title, categories, series, yAxisTitle, xAxisTitle, colors, legend, tooltip]
  );

  return { options };
}

import { Options, SeriesAreasplineOptions, SeriesColumnOptions } from "highcharts";
import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import {
  legendStyle,
  titleStyle,
  tooltipInnerStyle,
  tooltipWrapperStyle,
  yAxisPrimaryStyle,
  yAxisQuaternaryStyle,
} from "@/shared/components/charts/highcharts/highcharts.styles";
import {
  HighchartsOptionsParams,
  HighchartsOptionsReturn,
} from "@/shared/components/charts/highcharts/highcharts.types";

interface ExtendedTooltipPositionerPointObject extends Highcharts.TooltipPositionerPointObject {
  negative: boolean;
  h: number;
}

export function useStackedColumnAreaSplineChartOptions({
  title,
  categories,
  series,
  yAxisTitle,
  xAxisTitle,
  colors = ["#EE46BC", "#8400b0", "#9a00d7", "#ff9000"],
  legend,
  tooltip,
  min,
}: HighchartsOptionsParams): HighchartsOptionsReturn {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const options = useMemo<Options>(
    () => ({
      chart: {
        type: "column",
        backgroundColor: "transparent",
        plotBackgroundColor: "rgba(255, 255, 255, 0)",
        spacingTop: 40,
      },
      credits: {
        enabled: false, // Disable the credits
      },
      title: {
        text: title,
        style: titleStyle,
      },
      xAxis: {
        categories,
        labels: {
          style: yAxisQuaternaryStyle,
        },
        crosshair: false,
      },
      yAxis: [
        {
          min: min ?? 0,
          title: {
            text: yAxisTitle?.[0],
            style: yAxisQuaternaryStyle,
            align: "high",
            offset: 0,
            rotation: 0,
            y: -20,
            reserveSpace: false,
            textAlign: "left",
          },
          labels: {
            style: yAxisQuaternaryStyle,
          },
          stackLabels: {
            enabled: false, // Disable stack labels to hide totals
          },
          gridLineColor: "#697586",
          gridLineDashStyle: "Dash",
        },
        {
          title: {
            text: yAxisTitle?.[1],
            style: yAxisPrimaryStyle,
            align: "high",
            offset: 0,
            rotation: 0,
            y: -20,
            reserveSpace: false,
            textAlign: "right",
          },
          labels: {
            style: yAxisPrimaryStyle,
          },
          opposite: true,
          gridLineWidth: 0,
        },
      ],
      legend: {
        ...legend,
        itemStyle: legendStyle,
        itemHoverStyle: legendStyle,
        enabled: false,
      },
      tooltip: {
        ...tooltipWrapperStyle,
        style: tooltipInnerStyle,
        useHTML: true, // Allow HTML formatting
        headerFormat: "<div class='font-medium mb-xs'>{point.key}</div>", // Category name
        pointFormat:
          "<div><span class='text-typography-secondary'>{series.name}</span> <span class='font-medium'>{point.y}</span></div>", // Series name and value
        pointFormatter() {
          if (this.series.name === "Granted" || this.series.name === "Rewarded") {
            const { amount, code } = moneyKernelPort.format({
              amount: this.y,
              currency: moneyKernelPort.getCurrency("USD"),
            });

            return `<div><span class='text-typography-secondary'>${this.series.name}</span> <span class='font-medium'>${amount} ${code}</span</div>`;
          }

          return `<div><span class='text-typography-secondary'>${this.series.name}</span> <span class='font-medium'>${this.y ? Intl.NumberFormat().format(this.y) : ""}</span></div>`;
        },
        positioner(labelWidth, labelHeight, point) {
          // Need to cast extended point object to avoid TypeScript error, Highcharts types are wrong.
          const _point = point as ExtendedTooltipPositionerPointObject;
          const x = _point.plotX + this.chart.plotLeft - labelWidth / 2; // Center the tooltip horizontally
          let y = _point.plotY - labelHeight;

          if (_point.negative) {
            y = _point.plotY - _point.h - labelHeight;
          }

          return { x, y };
        },
        outside: true,
        ...tooltip,
      },
      plotOptions: {
        column: {
          stacking: "normal",
        },
        series: {
          borderRadius: 10, // Set the radius for rounded corners
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: series.map<SeriesColumnOptions | SeriesAreasplineOptions>((s, index) => ({
        type: s.type ?? "column",
        name: s.name,
        data: s.data,
        color: s.type === "areaspline" ? "#C434FF" : colors[index % colors.length],
        yAxis: s.type === "areaspline" ? 1 : undefined,
        fillColor:
          s.type === "areaspline"
            ? {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1,
                },
                stops: [
                  [0, "rgba(196, 52, 255, 0.30)"], // Start color
                  [1, "rgba(196, 52, 255, 0.00)"], // End color
                ],
              }
            : undefined,
        marker:
          s.type === "areaspline"
            ? {
                enabled: true,
                radius: 3,
                fillColor: "white", // Set the marker color to white
                lineColor: "white", // Optional: set the border color of the marker to white
              }
            : undefined,
        lineColor: s.type === "areaspline" ? "#ffffff" : undefined,
      })),
    }),
    [title, min, moneyKernelPort, categories, series, yAxisTitle, xAxisTitle, colors, legend, tooltip]
  );

  return { options };
}

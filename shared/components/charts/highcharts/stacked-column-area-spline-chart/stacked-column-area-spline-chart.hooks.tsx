import { Options, SeriesAreasplineOptions, SeriesColumnOptions } from "highcharts";
import { useMemo } from "react";

import {
  legendStyle,
  titleStyle,
  tooltipInnerStyle,
  tooltipWrapperStyle,
  xAxisStyle,
  yAxisPrimaryStyle,
  yAxisQuaternaryStyle,
} from "@/shared/components/charts/highcharts/highcharts.styles";
import {
  HighchartsOptionsParams,
  HighchartsOptionsReturn,
} from "@/shared/components/charts/highcharts/highcharts.types";

export function useStackedColumnAreaSplineChartOptions({
  title,
  categories,
  series,
  yAxisTitle,
  xAxisTitle,
  tooltipFormat = "{point.y}",
  colors = ["#EE46BC", "#8400b0", "#9a00d7", "#ff9000"],
  legend,
  tooltip,
  min,
}: HighchartsOptionsParams): HighchartsOptionsReturn {
  const options = useMemo<Options>(
    () => ({
      chart: {
        type: "column",
        backgroundColor: "transparent",
        plotBackgroundColor: "rgba(255, 255, 255, 0)",
      },
      title: {
        text: title,
        style: titleStyle,
      },
      xAxis: {
        categories,
        title: {
          text: xAxisTitle,
          style: xAxisStyle,
        },
        labels: {
          style: yAxisPrimaryStyle,
        },
        crosshair: true,
      },
      yAxis: [
        {
          min: min ?? 0,
          title: {
            text: xAxisTitle,
            style: yAxisPrimaryStyle,
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
            text: yAxisTitle,
            style: yAxisPrimaryStyle,
          },
          opposite: true,
          visible: false, // Hide the second y-axis
        },
        {
          title: {
            text: xAxisTitle, // Optional title for clarity
          },
          labels: {
            style: yAxisPrimaryStyle,
          },
          opposite: true, // Place it on the opposite side
          linkedTo: 0, // Link to the first y-axis
          showEmpty: false, // Prevents it from showing if no data exists
          gridLineColor: "#4C4C5C",
          gridLineDashStyle: "Dash",
        },
      ],
      legend: {
        ...legend,
        itemStyle: legendStyle,
        itemHoverStyle: legendStyle,
        enabled: false,
      },
      tooltip: {
        ...tooltip,
        pointFormat: tooltipFormat,
        ...tooltipWrapperStyle,
        style: tooltipInnerStyle,
        shared: true, // Enable shared tooltips
        useHTML: true, // Allow HTML formatting
        formatter() {
          let s = `<strong>${this.x}</strong><br/><br/>`; // Category name
          this.points?.forEach(point => {
            s += `${point.series.name}: ${point.y}<br/>`; // Series name and value
          });
          return s;
        },
        positioner(labelWidth, _labelHeight, point) {
          const chart = this.chart;
          const x = point.plotX + chart.plotLeft - labelWidth / 2; // Center the tooltip horizontally
          const y = 24; // Position above the point

          return { x, y };
        },
      },
      plotOptions: {
        column: {
          stacking: "normal",
        },
        series: {
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
                radius: 5,
              }
            : undefined,
      })),
    }),
    [title, categories, series, yAxisTitle, xAxisTitle, tooltipFormat, colors, legend, tooltip]
  );

  return { options };
}

import { Options, SeriesAreasplineOptions, SeriesColumnOptions } from "highcharts";
import { useMemo } from "react";

import {
  legendStyle,
  titleStyle,
  tooltipInnerStyle,
  tooltipWrapperStyle,
  xAxisStyle,
  yAxisStyle,
} from "@/shared/components/charts/highcharts/column-chart/column-chart.styles";
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
  colors = ["#510077", "#A03AE9", "#9C9CFF", "#F04438"],
  legend,
  tooltip,
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
          style: yAxisStyle,
        },
        crosshair: true,
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: xAxisTitle,
            style: yAxisStyle,
          },
          labels: {
            style: yAxisStyle,
          },
          stackLabels: {
            enabled: false, // Disable stack labels to hide totals
          },
          gridLineColor: "#4C4C5C",
          gridLineDashStyle: "Dash",
        },
        {
          title: {
            text: yAxisTitle,
            style: yAxisStyle,
          },
          opposite: true,
          visible: false, // Hide the second y-axis
          gridLineColor: "#4C4C5C",
          gridLineDashStyle: "Dash",
        },
        {
          title: {
            text: xAxisTitle, // Optional title for clarity
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
        color: s.color ?? colors[index % colors.length],
        yAxis: s.yAxis,
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
                  [0, "rgba(196, 52, 255, 0.50)"], // Start color
                  [1, "rgba(196, 52, 255, 0.00)"], // End color
                ],
              }
            : undefined,
      })),
    }),
    [title, categories, series, yAxisTitle, xAxisTitle, tooltipFormat, colors, legend, tooltip]
  );

  return { options };
}

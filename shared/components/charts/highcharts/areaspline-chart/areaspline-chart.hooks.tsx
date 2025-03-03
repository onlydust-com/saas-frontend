import Highcharts, { ColorString, Options, SeriesAreasplineOptions } from "highcharts";
import { useMemo } from "react";

import {
  legendStyle,
  titleStyle,
  tooltipInnerStyle,
  tooltipWrapperStyle,
  xAxisStyle,
  yAxisPrimaryStyle,
} from "@/shared/components/charts/highcharts/highcharts.styles";
import {
  HighchartsOptionsParams,
  HighchartsOptionsReturn,
} from "@/shared/components/charts/highcharts/highcharts.types";

export function useAreaSplineChartOptions({
  title,
  categories,
  series,
  xAxisTitle,
  xAxis,
  colors = [
    "#B654FC", // --chart-areaspline-primary
    "#4EA7FC", // --chart-areaspline-secondary
    "#ff9000", // --chart-areaspline-tertiary
  ],
  legend,
  tooltip,
  height,
  yAxis,
  min,
}: HighchartsOptionsParams): HighchartsOptionsReturn {
  const { title: yAxisTitle, visible: isYAxisVisible = true, labels } = yAxis ?? {};

  const options = useMemo<Options>(
    () => ({
      chart: {
        type: "areaspline",
        backgroundColor: "transparent",
        height,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: title,
        style: titleStyle,
      },
      xAxis: {
        ...xAxis,
        categories,
        title: {
          text: xAxisTitle,
          style: xAxisStyle,
        },
        labels: {
          style: yAxisPrimaryStyle,
        },
        lineWidth: 0,
      },
      yAxis: {
        min: min ?? 0,
        title: {
          text: yAxisTitle?.[0],
          style: yAxisPrimaryStyle,
        },
        labels: {
          enabled: false,
          style: yAxisPrimaryStyle,
          ...labels,
        },
        gridLineColor: "var(--border-primary)",
        visible: isYAxisVisible,
      },
      legend: {
        ...legend,
        layout: "vertical",
        align: "left",
        itemStyle: legendStyle,
        itemHoverStyle: legendStyle,
      },
      tooltip: {
        ...tooltipWrapperStyle,
        style: tooltipInnerStyle,
        shared: true, // Enable shared tooltips
        useHTML: true, // Allow HTML formatting
        headerFormat: "<div class='font-medium mb-xs'>{point.key}</div>", // Category name
        pointFormat:
          "<div><span class='text-typography-secondary'>{series.name}</span> <span class='font-medium'>{point.y}</span></div>", // Series name and value
        positioner(labelWidth, _labelHeight, point) {
          const chart = this.chart;
          const x = point.plotX + chart.plotLeft - labelWidth / 2; // Center the tooltip horizontally
          const y = 24; // Position above the point

          return { x, y };
        },
        outside: true,
        ...tooltip,
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5,
          marker: {
            enabled: false,
            symbol: "circle",
            lineColor: undefined,
            radius: 3,
          },
        },
      },
      series: series.map<SeriesAreasplineOptions>((s, index) => {
        const color = colors[index % colors.length];

        return {
          type: "areaspline",
          name: s.name,
          data: s.data,
          color,
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 0.8,
            },
            stops: [
              [0, Highcharts.color(color).setOpacity(0.2).get("rgba") as ColorString], // Start color
              [1, Highcharts.color(color).setOpacity(0).get("rgba") as ColorString], // End color
            ],
          },
        };
      }),
    }),
    [title, categories, series, yAxisTitle, xAxisTitle, colors, legend, tooltip, min]
  );

  return { options };
}

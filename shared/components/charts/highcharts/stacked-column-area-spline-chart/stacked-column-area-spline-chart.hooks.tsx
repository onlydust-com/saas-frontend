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
  colors = ["#EE46BC", "#8400b0", "#9a00d7", "#ff9000"],
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
      yAxis: {
        min: 0,
        title: {
          text: yAxisTitle,
          style: yAxisStyle,
        },
        labels: {
          style: yAxisStyle,
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            color: "gray",
          },
        },
        gridLineColor: "#4C4C5C",
      },
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
        color: colors[index % colors.length],
      })),
    }),
    [title, categories, series, yAxisTitle, xAxisTitle, tooltipFormat, colors, legend, tooltip]
  );

  return { options };
}

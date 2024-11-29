import { Options, SeriesBarOptions } from "highcharts";
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

export function useBarChartOptions({
  title,
  categories,
  series,
  xAxisTitle,
  colors = ["#460066"],
  legend,
  tooltip,
  height,
  yAxis,
}: HighchartsOptionsParams): HighchartsOptionsReturn {
  const { title: yAxisTitle, visible: isYAxisVisible = false } = yAxis ?? {};
  const options = useMemo<Options>(
    () => ({
      chart: {
        ype: "bar",
        backgroundColor: "transparent",
        plotBackgroundColor: "rgba(255, 255, 255, 0)",
        spacing: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        height,
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
        title: {
          text: xAxisTitle,
          style: xAxisStyle,
        },
        crosshair: true,
        lineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: yAxisTitle?.[0],
          style: yAxisPrimaryStyle,
        },
        labels: {
          style: yAxisPrimaryStyle,
        },
        gridLineColor: "#4C4C5C",
        visible: isYAxisVisible,
      },
      legend: {
        ...legend,
        enabled: false, // Hide the legend
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
        outside: true,
        ...tooltip,
      },
      series: series.map<SeriesBarOptions>((s, index) => ({
        type: "bar",
        borderRadius: 5,
        pointWidth: 28,
        borderWidth: 0,
        name: s.name,
        data: s.data,
        color: colors[index % colors.length],
        dataLabels: {
          style: yAxisPrimaryStyle,
          enabled: true,
          verticalAlign: "middle",
          x: 0,
          format: "{point.category}: {point.y}",
        },
      })),
    }),
    [title, categories, series, yAxis, xAxisTitle, colors, legend, tooltip]
  );

  return { options };
}

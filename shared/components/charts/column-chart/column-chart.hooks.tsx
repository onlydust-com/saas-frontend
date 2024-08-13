import { Options, SeriesColumnOptions } from "highcharts";
import { useMemo } from "react";

import {
  UseColumnChartOptionsParams,
  UseColumnChartOptionsReturn,
} from "@/shared/components/charts/column-chart/column-chart.types";
import {
  legendStyle,
  titleStyle,
  xAxisStyle,
  yAxisStyle,
} from "@/shared/components/charts/column-chart/culumn-chart.styles";

export function useColumnChartOptions({
  title,
  categories,
  series,
  yAxisTitle,
  xAxisTitle,
  tooltipFormat = "{point.y}",
  colors = ["#0B0CCB", "#CDCDDC", "#1E2551"],
}: UseColumnChartOptionsParams): UseColumnChartOptionsReturn {
  const options = useMemo<Options>(
    () => ({
      chart: {
        type: "column",
        backgroundColor: "transparent",
      },
      title: {
        text: title,
        style: { ...titleStyle },
      },
      xAxis: {
        categories,
        title: {
          text: xAxisTitle,
          style: { ...xAxisStyle },
        },
        labels: {
          style: { ...yAxisStyle },
        },
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: yAxisTitle,
          style: { ...yAxisStyle },
        },
        labels: {
          style: { ...yAxisStyle },
        },
        gridLineColor: "#4C4C5C",
      },
      legend: {
        itemStyle: {
          ...legendStyle,
        },
        itemHoverStyle: {
          ...legendStyle,
        },
      },
      tooltip: {
        pointFormat: tooltipFormat,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: series.map<SeriesColumnOptions>((s, index) => ({
        type: "column",
        name: s.name,
        data: s.data,
        color: colors[index % colors.length],
      })),
    }),
    [title, categories, series, yAxisTitle, xAxisTitle, tooltipFormat, colors]
  );

  return { options };
}

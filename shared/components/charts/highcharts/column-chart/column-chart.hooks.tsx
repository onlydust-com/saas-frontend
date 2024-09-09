import { Options, SeriesColumnOptions } from "highcharts";
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
  UseColumnChartOptionsParams,
  UseColumnChartOptionsReturn,
} from "@/shared/components/charts/highcharts/column-chart/column-chart.types";

export function useColumnChartOptions({
  title,
  categories,
  series,
  yAxisTitle,
  xAxisTitle,
  tooltipFormat = "{point.y}",
  colors = ["#EE46BC", "#8400b0", "#9a00d7", "#ff9000"],
  legend,
  tooltip,
}: UseColumnChartOptionsParams): UseColumnChartOptionsReturn {
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
    [title, categories, series, yAxisTitle, xAxisTitle, tooltipFormat, colors, legend, tooltip]
  );

  return { options };
}

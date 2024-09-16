import { Options, SeriesColumnOptions } from "highcharts";
import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

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

export function useMapChartOptions({
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
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const options = useMemo<Options>(
    () => ({
      chart: {
        type: "column",
        backgroundColor: "transparent",
        plotBackgroundColor: "rgba(255, 255, 255, 0)",
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
        labels: {
          style: yAxisQuaternaryStyle,
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
            if (point.series.name === "Granted" || point.series.name === "Rewarded") {
              s += `${point.series.name}: ${moneyKernelPort.format({ amount: point.y, currency: moneyKernelPort.getCurrency("USD") }).amount} USD<br/>`;
              return;
            }
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
          borderRadius: 10, // Set the radius for rounded corners
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

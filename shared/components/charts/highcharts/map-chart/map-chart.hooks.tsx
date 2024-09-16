import { Options, SeriesMapOptions } from "highcharts";
import { useMemo } from "react";

import {
  legendStyle,
  titleStyle,
  tooltipInnerStyle,
  tooltipWrapperStyle,
} from "@/shared/components/charts/highcharts/highcharts.styles";
import {
  HighchartsOptionsParams,
  HighchartsOptionsReturn,
} from "@/shared/components/charts/highcharts/highcharts.types";

export function useMapChartOptions({
  title,
  series,
  tooltipFormat = "{point.y}",
  colors = ["#EE46BC", "#8400b0", "#9a00d7", "#ff9000"],
  legend,
  tooltip,
}: HighchartsOptionsParams): HighchartsOptionsReturn {
  const options = useMemo<Options>(
    () => ({
      chart: {
        map: "custom/world",
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
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom",
        },
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, "#EE46BC"], // < 5000
          [0.25, "#8400b0"], // 5000 - 10000
          [0.5, "#9a00d7"], // 10000 - 15000
          [0.75, "#ff9000"], // 15000 - 20000
          [1, "#008000"], // > 20000
        ],
        minColor: "#FFFFFF",
        maxColor: "#008000", // You can customize the max color
      },
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
        // formatter() {
        //   let s = `<strong>${this.x}</strong><br/><br/>`; // Category name
        //   this.points?.forEach(point => {
        //     if (point.series.name === "Granted" || point.series.name === "Rewarded") {
        //       s += `${point.series.name}: ${moneyKernelPort.format({ amount: point.y, currency: moneyKernelPort.getCurrency("USD") }).amount} USD<br/>`;
        //       return;
        //     }
        //     s += `${point.series.name}: ${point.y}<br/>`; // Series name and value
        //   });
        //   return s;
        // },
        // positioner(labelWidth, _labelHeight, point) {
        //   const chart = this.chart;
        //   const x = point.plotX + chart.plotLeft - labelWidth / 2; // Center the tooltip horizontally
        //   const y = 24; // Position above the point
        //
        //   return { x, y };
        // },
      },
      // plotOptions: {
      //   column: {
      //     stacking: "normal",
      //   },
      //   series: {
      //     borderRadius: 10, // Set the radius for rounded corners
      //     pointPadding: 0.2,
      //     borderWidth: 0,
      //   },
      // },
      series: series.map<SeriesMapOptions>((s, index) => ({
        type: "map",
        name: s.name,
        data: s.data,
        color: colors[index % colors.length],
        joinBy: "iso-a2", // Join by the country code
        states: {
          hover: {
            color: "#BADA55",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.value}", // Show country name and value
        },
      })),
    }),
    [title, series, tooltipFormat, colors, legend, tooltip]
  );

  return { options };
}

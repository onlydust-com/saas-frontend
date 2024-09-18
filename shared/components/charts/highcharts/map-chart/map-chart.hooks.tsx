import worldMap from "@highcharts/map-collection/custom/world.topo.json";
import { Options, SeriesMapOptions } from "highcharts";
import { useMemo } from "react";

import {
  legendStyle,
  tooltipInnerStyle,
  tooltipWrapperStyle,
} from "@/shared/components/charts/highcharts/highcharts.styles";
// World map data
import {
  HighchartsOptionsParams,
  HighchartsOptionsReturn,
} from "@/shared/components/charts/highcharts/highcharts.types";

export function useMapChartOptions({
  title,
  series,
  legend,
  tooltip,
}: HighchartsOptionsParams): HighchartsOptionsReturn {
  const options = useMemo<Options>(
    () => ({
      chart: {
        map: worldMap,
        backgroundColor: "transparent",
        plotBackgroundColor: "rgba(255, 255, 255, 0)",
      },
      tooltip: {
        ...tooltip,
        useHTML: true, // Enable HTML for tooltip
        formatter() {
          return `<strong>${this.point.name}</strong>: ${this.point.value} ${title}`;
        },
        followPointer: true, // Ensure the tooltip follows the mouse pointer
        ...tooltipWrapperStyle,
        style: tooltipInnerStyle,
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom",
        },
      },
      credits: {
        enabled: false, // Disable the credits
      },
      title: {
        text: undefined,
      },
      legend: {
        ...legend,
        itemStyle: legendStyle,
        itemHoverStyle: legendStyle,
        enabled: false,
      },
      series: series.map<SeriesMapOptions>(s => ({
        type: "map",
        name: s.name,
        data: s.data,
        joinBy: "iso-a2", // Join by the country code
        nullColor: "var(--background-tertiary)",
        borderColor: "var(--border-tertiary)",
        states: {
          hover: {
            color: "white",
            borderColor: "var(--border-tertiary)",
          },
        },
        dataLabels: {
          enabled: false, // Disable data labels to hide country names
        },
      })),
    }),
    [title, series, legend, tooltip]
  );

  return { options };
}

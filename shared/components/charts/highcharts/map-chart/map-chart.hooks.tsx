import worldMap from "@highcharts/map-collection/custom/world.geo.json";
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
        states: {
          hover: {
            color: "#000000",
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

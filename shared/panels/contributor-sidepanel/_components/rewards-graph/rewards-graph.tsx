import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import {
  DonnutChartColors,
  useDonnutChartOptions,
} from "@/shared/components/charts/highcharts/donut-chart/donut-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";

import { RewardsGraphProps } from "./rewards-graph.types";

const SHOWED_STATS_NUMBER = 4;
export function RewardsGraph({ githubId }: RewardsGraphProps) {
  const { t } = useTranslation("panels");
  const { data, isLoading } = UserReactQueryAdapter.client.useGetUserStats({
    pathParams: { githubId },
    options: {
      enabled: !!githubId,
    },
  });

  const orderedStats = (data?.earnings?.perProject || []).sort((a, b) => b.totalEarnedUsd - a.totalEarnedUsd);
  const mainStats = orderedStats.slice(0, SHOWED_STATS_NUMBER);
  const otherStats = orderedStats.slice(SHOWED_STATS_NUMBER);

  const mainData = mainStats.map((earning, i) => ({
    name: earning.projectName,
    y: earning.totalEarnedUsd,
    color: DonnutChartColors[i % DonnutChartColors.length],
  }));

  const allData = useMemo(
    () => [
      ...mainData,
      {
        name: t("contributor.earning.otherLabel"),
        y: otherStats.reduce((acc, curr) => acc + curr.totalEarnedUsd, 0),
        color: DonnutChartColors.at(-1) || "",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mainData, otherStats]
  );

  const total = useMemo(() => Math.round(allData.reduce((acc, curr) => acc + curr.y, 0) || 0), [allData]);

  const { options } = useDonnutChartOptions({
    categories: undefined,
    total,
    height: 213,
    min: 0,
    series: [
      {
        name: "Rewards",
        data: allData,
      },
    ],
  });

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  if (!mainData?.length) {
    return null;
  }

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contributor.earning.title" }} />
      <div className={"flex flex-row items-center justify-between gap-3"}>
        <div className={"w-full"}>
          <HighchartsDefault options={options} />
        </div>
        <div className={"flex w-full flex-col items-start justify-start"}>
          {allData.map(item => (
            <div key={item.name} className={"p-1"}>
              <ChartLegend key={item.name} rawColor={item.color}>
                {item.name}
              </ChartLegend>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}

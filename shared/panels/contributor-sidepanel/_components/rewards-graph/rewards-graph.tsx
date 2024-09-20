import { Calendar, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import {
  DonnutChartColors,
  useDonnutChartOptions,
} from "@/shared/components/charts/highcharts/donut-chart/donut-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { Translate } from "@/shared/translation/components/translate/translate";

import { RewardsGraphProps } from "./rewards-graph.types";

const SHOWED_STATS_NUMBER = 4;
export function RewardsGraph({ githubId }: RewardsGraphProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { t } = useTranslation("panels");
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.ALL_TIME);
  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = UserReactQueryAdapter.client.useGetUserStats({
    pathParams: { githubId },
    queryParams: {
      fromDate,
      toDate,
    },
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

  function onChangeRangeType(value: string) {
    if (dateKernelPort.isDateRangeType(value)) setRangeType(value);
  }

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

  if (!mainData?.length && rangeType === DateRangeType.ALL_TIME) {
    return null;
  }

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <div className={"flex flex-row items-center justify-between"}>
        <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contributor.earning.title" }} />
        <Menu
          items={[
            { label: <Translate token={"common:dateRangeType.LAST_WEEK"} />, id: DateRangeType.LAST_WEEK },
            { label: <Translate token={"common:dateRangeType.LAST_MONTH"} />, id: DateRangeType.LAST_MONTH },
            { label: <Translate token={"common:dateRangeType.LAST_SEMESTER"} />, id: DateRangeType.LAST_SEMESTER },
            { label: <Translate token={"common:dateRangeType.LAST_YEAR"} />, id: DateRangeType.LAST_YEAR },
            { label: <Translate token={"common:dateRangeType.ALL_TIME"} />, id: DateRangeType.ALL_TIME },
          ]}
          selectedIds={[rangeType]}
          onAction={onChangeRangeType}
          isPopOver
          closeOnSelect
        >
          <div>
            <Button
              as={"div"}
              variant={"secondary"}
              size={"md"}
              startIcon={{ component: Calendar }}
              endIcon={{ component: ChevronDown }}
            >
              <Translate token={`common:dateRangeType.${rangeType}`} />
            </Button>
          </div>
        </Menu>
      </div>
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

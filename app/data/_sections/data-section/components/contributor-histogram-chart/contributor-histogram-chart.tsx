import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useContributorHistogramChart } from "@/app/data/_sections/data-section/components/contributor-histogram-chart/contributor-histogram-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useStackedColumnAreaSplineChartOptions } from "@/shared/components/charts/highcharts/stacked-column-area-spline-chart/stacked-column-area-spline-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ContributorHistogramChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();

  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_WEEK);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorsStats({
    queryParams: {
      fromDate,
      toDate,
      timeGrouping: "MONTH",
    },
  });

  const { stats } = data ?? {};

  const {
    categories,
    mergedPrSeries,
    newContributorSeries,
    activeContributorSeries,
    reactivatedContributorSeries,
    churnedContributorSeries,
    renderNewContributorCount,
    renderReactivatedContributorCount,
    renderActiveContributorCount,
    renderChurnedContributorCount,
    renderMergedPrCount,
  } = useContributorHistogramChart(stats);

  const { options } = useStackedColumnAreaSplineChartOptions({
    categories,
    series: [
      { name: t("data:contributorsHistogram.legends.new"), data: newContributorSeries },
      { name: t("data:contributorsHistogram.legends.reactivated"), data: reactivatedContributorSeries },
      { name: t("data:contributorsHistogram.legends.active"), data: activeContributorSeries },
      { name: t("data:contributorsHistogram.legends.churned"), data: churnedContributorSeries },
      {
        name: t("data:contributorsHistogram.legends.prMerged"),
        data: mergedPrSeries,
        type: "areaspline",
        lineWidth: 4,
        marker: {
          enabled: true,
          radius: 5,
        },
        tooltip: {
          valueSuffix: " PRs",
        },
        yAxis: 1,
        color: "#C434FF",
      },
    ],
    legend: { enabled: false },
  });

  function onChangeRangeType(value: string) {
    setRangeType(value as DateRangeType);
  }

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: "w-full min-h-[300px]",
        }}
      />
    );
  }

  if (
    !newContributorSeries.length &&
    !reactivatedContributorSeries.length &&
    !activeContributorSeries.length &&
    !churnedContributorSeries.length &&
    !mergedPrSeries.length
  ) {
    return (
      <EmptyState
        titleTranslate={{ token: "data:contributorsHistogram.emptyState.title" }}
        descriptionTranslate={{ token: "data:contributorsHistogram.emptyState.description" }}
      />
    );
  }

  return (
    <div className="flex min-h-[300px] flex-col gap-4">
      <div>
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
        >
          <Button variant={"secondary"} size={"md"} startIcon={{ component: Calendar }}>
            <Translate token={`common:dateRangeType.${rangeType}`} />
          </Button>
        </Menu>
      </div>
      <HighchartsDefault options={options} />
      <div className="flex items-center gap-4">
        <Paper size={"lg"} classNames={{ base: "grid grid-cols-5 items-center gap-3 flex-1" }} background={"secondary"}>
          <div className="flex items-center justify-between gap-4">
            <ChartLegend color="primary">
              <Translate token={"data:contributorsHistogram.legends.new"} />
            </ChartLegend>
            {renderNewContributorCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="secondary">
              <Translate token={"data:contributorsHistogram.legends.reactivated"} />
            </ChartLegend>
            {renderReactivatedContributorCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="tertiary">
              <Translate token={"data:contributorsHistogram.legends.active"} />
            </ChartLegend>
            {renderActiveContributorCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="quaternary">
              <Translate token={"data:contributorsHistogram.legends.churned"} />
            </ChartLegend>
            {renderChurnedContributorCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="quaternary">
              <Translate token={"data:contributorsHistogram.legends.prMerged"} />
            </ChartLegend>
            {renderMergedPrCount}
          </div>
        </Paper>
      </div>
    </div>
  );
}

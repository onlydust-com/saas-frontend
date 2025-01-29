import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { isSplineType } from "@/app/(saas)/data/_components/histograms/histograms.utils";
import { SplineTypeMenu } from "@/app/(saas)/data/_components/histograms/menus/spline-type-menu/spline-type-menu";
import { SplineType } from "@/app/(saas)/data/_components/histograms/menus/spline-type-menu/spline-type-menu.types";
import { TimeGroupingMenu } from "@/app/(saas)/data/_components/histograms/menus/time-grouping-menu/time-grouping-menu";
import { useGlobalDataFilter } from "@/app/(saas)/data/_features/global-data-filter/global-data-filter.context";
import { useProjectHistogramChart } from "@/app/(saas)/data/overview/_features/project-histogram-chart/project-histogram-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useStackedColumnAreaSplineChartOptions } from "@/shared/components/charts/highcharts/stacked-column-area-spline-chart/stacked-column-area-spline-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProjectHistogramChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { selectedProgramAndEcosystem, period } = useGlobalDataFilter();
  const [timeGroupingType, setTimeGroupingType] = useState<TimeGroupingType>(TimeGroupingType.MONTH);
  const [splineType, setSplineType] = useState<SplineType>(SplineType.PR);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiProjectsStats({
    queryParams: {
      fromDate: period.from,
      toDate: period.to,
      timeGrouping: timeGroupingType,
      ...(selectedProgramAndEcosystem.length && { dataSourceIds: selectedProgramAndEcosystem }),
    },
  });

  const { stats } = data ?? {};

  const {
    categories,
    mergedPrSeries,
    grantedSeries,
    rewardedSeries,
    newProjectSeries,
    activeProjectSeries,
    reactivatedProjectSeries,
    churnedProjectSeries,
    minChurnedProject,
  } = useProjectHistogramChart(stats, timeGroupingType);

  const splineSeries = useMemo(() => {
    switch (splineType) {
      case SplineType.GRANTED:
        return {
          name: t("data:histograms.legends.granted"),
          data: grantedSeries,
        };
      case SplineType.REWARDED:
        return {
          name: t("data:histograms.legends.rewarded"),
          data: rewardedSeries,
        };
      case SplineType.PR:
      default:
        return {
          name: t("data:histograms.legends.prMerged"),
          data: mergedPrSeries,
        };
    }
  }, [splineType, grantedSeries, rewardedSeries, mergedPrSeries]);

  const { options } = useStackedColumnAreaSplineChartOptions({
    dataViewTarget: "projects",
    dateRangeType: period.rangeType,
    timeGroupingType,
    selectedProgramAndEcosystem,
    categories,
    min: minChurnedProject,
    series: [
      { name: t("data:histograms.legends.new"), data: newProjectSeries },
      { name: t("data:histograms.legends.reactivated"), data: reactivatedProjectSeries },
      { name: t("data:histograms.legends.active"), data: activeProjectSeries },
      { name: t("data:histograms.legends.churned"), data: churnedProjectSeries },
      {
        ...splineSeries,
        type: "areaspline",
      },
    ],
  });

  function onChangeTimeGroupingType(value: string) {
    if (dateKernelPort.isTimeGroupingType(value)) setTimeGroupingType(value);
  }

  function onChangeSplineType(value: string) {
    if (isSplineType(value)) setSplineType(value);
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
    !newProjectSeries.length &&
    !reactivatedProjectSeries.length &&
    !activeProjectSeries.length &&
    !churnedProjectSeries.length &&
    !mergedPrSeries.length
  ) {
    return (
      <EmptyState
        titleTranslate={{ token: "data:histograms.emptyState.title" }}
        descriptionTranslate={{ token: "data:histograms.emptyState.description" }}
      />
    );
  }

  return (
    <div className="flex min-h-[300px] flex-col gap-lg divide-y divide-border-primary">
      <div className="flex items-start justify-between gap-lg">
        <Typo
          weight={"medium"}
          size={"md"}
          color={"primary"}
          translate={{ token: "data:histograms.projectActivity" }}
        />
        <TimeGroupingMenu
          selectedTimeGrouping={timeGroupingType}
          onAction={onChangeTimeGroupingType}
          relatedDateRangeType={period.rangeType}
        />
      </div>
      <HighchartsDefault options={options} />
      <Paper size={"lg"} classNames={{ base: "flex gap-lg items-center" }} background={"secondary"}>
        <ChartLegend color="primary" tooltipProps={{ content: <Translate token="data:histograms.tooltips.new" /> }}>
          <Translate token={"data:histograms.legends.new"} />
        </ChartLegend>
        <ChartLegend
          color="secondary"
          tooltipProps={{ content: <Translate token="data:histograms.tooltips.reactivated" /> }}
        >
          <Translate token={"data:histograms.legends.reactivated"} />
        </ChartLegend>
        <ChartLegend color="tertiary" tooltipProps={{ content: <Translate token="data:histograms.tooltips.active" /> }}>
          <Translate token={"data:histograms.legends.active"} />
        </ChartLegend>
        <ChartLegend
          color="quaternary"
          tooltipProps={{ content: <Translate token="data:histograms.tooltips.churned" /> }}
        >
          <Translate token={"data:histograms.legends.churned"} />
        </ChartLegend>
        <SplineTypeMenu selectedSplineType={splineType} onAction={onChangeSplineType} />
      </Paper>
    </div>
  );
}

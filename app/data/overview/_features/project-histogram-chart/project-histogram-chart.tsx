import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { isSplineType } from "@/app/data/_components/histograms/histograms.utils";
import { SplineTypeMenu } from "@/app/data/_components/histograms/menus/spline-type-menu/spline-type-menu";
import { SplineType } from "@/app/data/_components/histograms/menus/spline-type-menu/spline-type-menu.types";
import { TimeGroupingMenu } from "@/app/data/_components/histograms/menus/time-grouping-menu/time-grouping-menu";
import { useProjectHistogramChart } from "@/app/data/overview/_features/project-histogram-chart/project-histogram-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType, TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useStackedColumnAreaSplineChartOptions } from "@/shared/components/charts/highcharts/stacked-column-area-spline-chart/stacked-column-area-spline-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProjectHistogramChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const rangeMenu = useRangeSelectOptions();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_SEMESTER);
  const [timeGroupingType, setTimeGroupingType] = useState<TimeGroupingType>(TimeGroupingType.MONTH);
  const [splineType, setSplineType] = useState<SplineType>(SplineType.PR);
  const [selectedProgramAndEcosystem, setSelectedProgramAndEcosystem] = useState<string[]>([]);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiProjectsStats({
    queryParams: {
      fromDate,
      toDate,
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
    dateRangeType: rangeType,
    timeGroupingType,
    selectedProgramAndEcosystem,
    yAxis: { title: [t("data:histograms.data.projects"), splineSeries.name] },
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
          // TODO @Mehdi use rangeType from new global filter context
          relatedDateRangeType={DateRangeType.LAST_SEMESTER}
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

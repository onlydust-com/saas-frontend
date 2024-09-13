import { Calendar, GitCommitHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useProjectHistogramChart } from "@/app/data/_sections/data-section/components/histograms/project-histogram-chart/project-histogram-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useStackedColumnAreaSplineChartOptions } from "@/shared/components/charts/highcharts/stacked-column-area-spline-chart/stacked-column-area-spline-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProjectHistogramChart() {
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

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiProjectsStats({
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
    newProjectSeries,
    activeProjectSeries,
    reactivatedProjectSeries,
    churnedProjectSeries,
    renderNewContributorCount,
    renderReactivatedProjectCount,
    renderActiveProjectCount,
    renderChurnedProjectCount,
    renderMergedPrCount,
    minChurnedProject,
  } = useProjectHistogramChart(stats);

  const { options } = useStackedColumnAreaSplineChartOptions({
    categories,
    min: minChurnedProject,
    series: [
      { name: t("data:histograms.legends.new"), data: newProjectSeries },
      { name: t("data:histograms.legends.reactivated"), data: reactivatedProjectSeries },
      { name: t("data:histograms.legends.active"), data: activeProjectSeries },
      { name: t("data:histograms.legends.churned"), data: churnedProjectSeries },
      {
        name: t("data:histograms.legends.prMerged"),
        data: mergedPrSeries,
        type: "areaspline",
      },
    ],
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
              <Translate token={"data:histograms.legends.new"} />
            </ChartLegend>
            {renderNewContributorCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="secondary">
              <Translate token={"data:histograms.legends.reactivated"} />
            </ChartLegend>
            {renderReactivatedProjectCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="tertiary">
              <Translate token={"data:histograms.legends.active"} />
            </ChartLegend>
            {renderActiveProjectCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="quaternary">
              <Translate token={"data:histograms.legends.churned"} />
            </ChartLegend>
            {renderChurnedProjectCount}
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon component={GitCommitHorizontal} classNames={{ base: "text-text-1" }} />
              <Typo
                as={"div"}
                size={"xs"}
                weight={"medium"}
                translate={{ token: "data:histograms.legends.prMerged" }}
              />
            </div>
            {renderMergedPrCount}
          </div>
        </Paper>
      </div>
    </div>
  );
}

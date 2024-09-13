import { Calendar, ChevronDown, GitCommitHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useContributorHistogramChart } from "@/app/data/_sections/data-section/components/histograms/contributor-histogram-chart/contributor-histogram-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType, TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";
import { RadioButtonGroup } from "@/design-system/molecules/radio-button-group";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useStackedColumnAreaSplineChartOptions } from "@/shared/components/charts/highcharts/stacked-column-area-spline-chart/stacked-column-area-spline-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ContributorHistogramChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();

  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_SEMESTER);
  const [timeGroupingType, setTimeGroupingType] = useState<TimeGroupingType>(TimeGroupingType.MONTH);
  const [splineType, setSplineType] = useState<"grant" | "reward" | "pr">("pr");

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
      timeGrouping: timeGroupingType,
    },
  });

  const { stats } = data ?? {};

  const {
    categories,
    grantedSeries,
    rewardedSeries,
    mergedPrSeries,
    newContributorSeries,
    activeContributorSeries,
    reactivatedContributorSeries,
    churnedContributorSeries,
    renderNewContributorCount,
    renderReactivatedContributorCount,
    renderActiveContributorCount,
    renderChurnedContributorCount,
    renderGrantedAmount,
    renderRewardedAmount,
    renderMergedPrCount,
    minChurnedContributor,
  } = useContributorHistogramChart(stats, timeGroupingType);

  const splineSeries = useMemo(() => {
    switch (splineType) {
      case "grant":
        return {
          name: t("data:histograms.legends.granted"),
          data: grantedSeries,
        };
      case "reward":
        return {
          name: t("data:histograms.legends.rewarded"),
          data: rewardedSeries,
        };
      case "pr":
      default:
        return {
          name: t("data:histograms.legends.prMerged"),
          data: mergedPrSeries,
        };
    }
  }, [t, splineType, grantedSeries, rewardedSeries, mergedPrSeries]);

  const splineLegend = useMemo(() => {
    switch (splineType) {
      case "grant":
        return (
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon component={GitCommitHorizontal} classNames={{ base: "text-text-1" }} />
              <Typo as={"div"} size={"xs"} weight={"medium"} translate={{ token: "data:histograms.legends.granted" }} />
            </div>
            {renderGrantedAmount}
          </div>
        );
      case "reward":
        return (
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon component={GitCommitHorizontal} classNames={{ base: "text-text-1" }} />
              <Typo
                as={"div"}
                size={"xs"}
                weight={"medium"}
                translate={{ token: "data:histograms.legends.rewarded" }}
              />
            </div>
            {renderRewardedAmount}
          </div>
        );
      case "pr":
      default:
        return (
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
        );
    }
  }, [splineType, renderMergedPrCount, renderGrantedAmount, renderRewardedAmount]);

  const { options } = useStackedColumnAreaSplineChartOptions({
    categories,
    min: minChurnedContributor,
    series: [
      { name: t("data:histograms.legends.new"), data: newContributorSeries },
      { name: t("data:histograms.legends.reactivated"), data: reactivatedContributorSeries },
      { name: t("data:histograms.legends.active"), data: activeContributorSeries },
      { name: t("data:histograms.legends.churned"), data: churnedContributorSeries },
      {
        ...splineSeries,
        type: "areaspline",
      },
    ],
  });

  function onChangeRangeType(value: string) {
    setRangeType(value as DateRangeType);
  }

  function onChangeTimeGroupingType(value: string) {
    setTimeGroupingType(value as TimeGroupingType);
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
        titleTranslate={{ token: "data:histograms.emptyState.title" }}
        descriptionTranslate={{ token: "data:histograms.emptyState.description" }}
      />
    );
  }

  return (
    <div className="flex min-h-[300px] flex-col gap-4">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
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
            <Button
              as={"div"}
              variant={"secondary"}
              size={"md"}
              startIcon={{ component: Calendar }}
              endIcon={{ component: ChevronDown }}
            >
              <Translate token={`common:dateRangeType.${rangeType}`} />
            </Button>
          </Menu>
          <Menu
            items={[
              { label: <Translate token={"common:timeGroupingType.DAY"} />, id: TimeGroupingType.DAY },
              { label: <Translate token={"common:timeGroupingType.WEEK"} />, id: TimeGroupingType.WEEK },
              { label: <Translate token={"common:timeGroupingType.MONTH"} />, id: TimeGroupingType.MONTH },
              { label: <Translate token={"common:timeGroupingType.QUARTER"} />, id: TimeGroupingType.QUARTER },
              { label: <Translate token={"common:timeGroupingType.YEAR"} />, id: TimeGroupingType.YEAR },
            ]}
            selectedIds={[timeGroupingType]}
            onAction={onChangeTimeGroupingType}
            isPopOver
          >
            <Button variant={"secondary"} size={"md"} endIcon={{ component: ChevronDown }}>
              <Translate token={`common:timeGroupingType.${timeGroupingType}`} />
            </Button>
          </Menu>
        </div>

        <div className="flex gap-2">
          <RadioButtonGroup
            items={[
              {
                value: "grant",
                label: t("data:histograms.splineTypes.totalGranted"),
              },
              {
                value: "reward",
                label: t("data:histograms.splineTypes.totalRewarded"),
              },
              {
                value: "pr",
                label: t("data:histograms.splineTypes.prMerged"),
              },
            ]}
            value={splineType}
            onChange={v => setSplineType(v)}
          />
        </div>
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
            {renderReactivatedContributorCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="tertiary">
              <Translate token={"data:histograms.legends.active"} />
            </ChartLegend>
            {renderActiveContributorCount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="quaternary">
              <Translate token={"data:histograms.legends.churned"} />
            </ChartLegend>
            {renderChurnedContributorCount}
          </div>
          {splineLegend}
        </Paper>
      </div>
    </div>
  );
}

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { SplineType } from "@/app/data/_components/histograms/histograms.types";
import { SplineLegend } from "@/app/data/_components/histograms/legends/spline-legend";
import { useGlobalDataFilter } from "@/app/data/_features/global-data-filter/global-data-filter.context";
import { useContributorHistogramChart } from "@/app/data/overview/_features/contributor-histogram-chart/contributor-histogram-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";
import { RadioButtonGroup } from "@/design-system/molecules/radio-button-group";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useStackedColumnAreaSplineChartOptions } from "@/shared/components/charts/highcharts/stacked-column-area-spline-chart/stacked-column-area-spline-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { useTimeGroupingSelectOptions } from "@/shared/hooks/select/use-time-grouping-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ContributorHistogramChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { selectedProgramAndEcosystem, period } = useGlobalDataFilter();
  const timeGroupingMenu = useTimeGroupingSelectOptions({ relatedDateRangeType: period.rangeType });
  const [timeGroupingType, setTimeGroupingType] = useState<TimeGroupingType>(TimeGroupingType.MONTH);
  const [splineType, setSplineType] = useState<SplineType>("pr");

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorsStats({
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
    grantedSeries,
    rewardedSeries,
    mergedPrSeries,
    newContributorSeries,
    activeContributorSeries,
    reactivatedContributorSeries,
    churnedContributorSeries,
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

  const { options } = useStackedColumnAreaSplineChartOptions({
    dataViewTarget: "contributor",
    dateRangeType: period.rangeType,
    timeGroupingType,
    selectedProgramAndEcosystem,
    yAxis: { title: [t("data:histograms.data.contributors"), splineSeries.name] },
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

  function onChangeTimeGroupingType(value: string) {
    if (dateKernelPort.isTimeGroupingType(value)) setTimeGroupingType(value);
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
      <div className="flex flex-col justify-between gap-2 tablet:flex-nowrap">
        <div className="flex flex-wrap gap-2 tablet:flex-nowrap">
          <Menu items={timeGroupingMenu} selectedIds={[timeGroupingType]} onAction={onChangeTimeGroupingType} isPopOver>
            <Button variant={"secondary"} size={"md"} endIcon={{ component: ChevronDown }}>
              <Translate token={`common:timeGroupingType.${timeGroupingType}`} />
            </Button>
          </Menu>
        </div>

        <div className="flex flex-wrap gap-2 tablet:flex-nowrap">
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
        <Paper size={"lg"} classNames={{ base: "grid tablet:grid-cols-5 gap-3 flex-1" }} background={"secondary"}>
          <ChartLegend color="primary">
            <Translate token={"data:histograms.legends.new"} />
          </ChartLegend>

          <ChartLegend color="secondary">
            <Translate token={"data:histograms.legends.reactivated"} />
          </ChartLegend>

          <ChartLegend color="tertiary">
            <Translate token={"data:histograms.legends.active"} />
          </ChartLegend>

          <ChartLegend color="quaternary">
            <Translate token={"data:histograms.legends.churned"} />
          </ChartLegend>

          <SplineLegend splineType={splineType} />
        </Paper>
      </div>
    </div>
  );
}

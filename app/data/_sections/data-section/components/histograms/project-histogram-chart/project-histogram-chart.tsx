import { Calendar, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { SplineType } from "@/app/data/_sections/data-section/components/histograms/histograms.types";
import { SplineLegend } from "@/app/data/_sections/data-section/components/histograms/legends/spline-legend";
import { useProjectHistogramChart } from "@/app/data/_sections/data-section/components/histograms/project-histogram-chart/project-histogram-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType, TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";
import { RadioButtonGroup } from "@/design-system/molecules/radio-button-group";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useStackedColumnAreaSplineChartOptions } from "@/shared/components/charts/highcharts/stacked-column-area-spline-chart/stacked-column-area-spline-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ProgramEcosystemAutocomplete } from "@/shared/features/program-ecosystem-autocomplete/program-ecosystem-autocomplete";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProjectHistogramChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const rangeMenu = useRangeSelectOptions();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_SEMESTER);
  const [timeGroupingType, setTimeGroupingType] = useState<TimeGroupingType>(TimeGroupingType.MONTH);
  const [splineType, setSplineType] = useState<SplineType>("pr");
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
      ...(selectedProgramAndEcosystem.length && { programOrEcosystemIds: selectedProgramAndEcosystem }),
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
    renderNewContributorCount,
    renderReactivatedProjectCount,
    renderActiveProjectCount,
    renderChurnedProjectCount,
    renderMergedPrCount,
    renderGrantedAmount,
    renderRewardedAmount,
    minChurnedProject,
  } = useProjectHistogramChart(stats, timeGroupingType);

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
        return <SplineLegend splineType={splineType}>{renderGrantedAmount}</SplineLegend>;
      case "reward":
        return <SplineLegend splineType={splineType}>{renderRewardedAmount}</SplineLegend>;
      case "pr":
      default:
        return <SplineLegend splineType={splineType}>{renderMergedPrCount}</SplineLegend>;
    }
  }, [splineType, renderMergedPrCount, renderGrantedAmount, renderRewardedAmount]);

  const { options } = useStackedColumnAreaSplineChartOptions({
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

  function onChangeRangeType(value: string) {
    if (dateKernelPort.isDateRangeType(value)) setRangeType(value);
  }

  function onChangeTimeGroupingType(value: string) {
    if (dateKernelPort.isTimeGroupingType(value)) setTimeGroupingType(value);
  }

  function onProgramEcosystemChange(ids: string[]) {
    setSelectedProgramAndEcosystem(ids);
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
      <div className="flex flex-wrap justify-between gap-2 tablet:flex-nowrap">
        <div className="flex flex-wrap gap-2 tablet:flex-nowrap">
          <ProgramEcosystemAutocomplete
            name={"programAndEcosystem"}
            placeholder={t("data:details.allDataFilter.placeholder")}
            onSelect={onProgramEcosystemChange}
            selectedProgramAndEcosystem={selectedProgramAndEcosystem}
          />
          <Menu items={rangeMenu} selectedIds={[rangeType]} onAction={onChangeRangeType} isPopOver>
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
        <Paper
          size={"lg"}
          classNames={{ base: "grid laptop:grid-cols-5 laptop:items-center gap-3 flex-1" }}
          background={"secondary"}
        >
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
          {splineLegend}
        </Paper>
      </div>
    </div>
  );
}

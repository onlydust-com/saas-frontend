import { useParams } from "next/navigation";

import { useFinancialColumnChart } from "@/app/programs/[programId]/_features/financial-column-chart/financial-column-chart.hooks";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { ColumnChart } from "@/shared/components/charts/highcharts/column-chart/column-chart";
import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FinancialColumnChart() {
  const { programId = "" } = useParams<{ programId: string }>();
  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramsTransactionsStats({
    pathParams: { programId },
  });

  const { stats } = data ?? {};

  const {
    categories,
    receivedSeries,
    grantedSeries,
    rewardedSeries,
    renderReceivedAmount,
    renderGrantedAmount,
    renderRewardedAmount,
  } = useFinancialColumnChart(stats);

  const { options } = useColumnChartOptions({
    categories,
    series: [
      { name: "Received", data: receivedSeries },
      { name: "Granted", data: grantedSeries },
      { name: "Rewarded", data: rewardedSeries },
    ],
    legend: { enabled: false },
    tooltip: { valueSuffix: " USD" },
  });

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: "w-full h-[400px]",
        }}
      />
    );
  }

  if (!receivedSeries.length && !grantedSeries.length && !rewardedSeries.length) {
    return (
      <EmptyState
        titleTranslate={{ token: "programs:financialColumnChart.emptyState.title" }}
        descriptionTranslate={{ token: "programs:financialColumnChart.emptyState.description" }}
      />
    );
  }

  return (
    <Paper size={"s"} container={"2"} border={"none"} classNames={{ base: "flex flex-col gap-4 h-[400px]" }}>
      <ColumnChart options={options} />
      <div className="grid grid-cols-5 items-center gap-4">
        <Paper size={"s"} classNames={{ base: "col-span-4 grid grid-cols-3 items-center gap-3" }}>
          <div className="flex items-center justify-between gap-4">
            <ChartLegend colors="brand-4">
              <Translate token={"programs:financialColumnChart.legends.received"} />
            </ChartLegend>
            {renderReceivedAmount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend colors="text-2">
              <Translate token={"programs:financialColumnChart.legends.granted"} />
            </ChartLegend>
            {renderGrantedAmount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend colors="container-3">
              <Translate token={"programs:financialColumnChart.legends.rewarded"} />
            </ChartLegend>
            {renderRewardedAmount}
          </div>
        </Paper>
        {/*TODO @Mehdi handle date range change*/}
        <div>Date Range popover trigger</div>
      </div>
    </Paper>
  );
}

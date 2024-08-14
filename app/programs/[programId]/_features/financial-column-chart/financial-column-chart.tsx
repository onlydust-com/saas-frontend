import { useParams } from "next/navigation";

import { ChartFooter } from "@/app/programs/[programId]/_features/financial-column-chart/components/chart-footer/chart-footer";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";

import { Paper } from "@/design-system/atoms/paper";

import { ColumnChart } from "@/shared/components/charts/highcharts/column-chart/column-chart";
import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";

export function FinancialColumnChart() {
  const { programId = "" } = useParams<{ programId: string }>();
  const { data } = ProgramReactQueryAdapter.client.useGetProgramsTransactionsStats({
    pathParams: {
      programId,
    },
  });

  const { stats } = data ?? {};
  const { format: formatDate } = bootstrap.getDateKernelPort();

  const categories = stats?.map(stat => formatDate(new Date(stat.date), "MMMM yyyy")) ?? [];
  const receivedSeries = stats?.map(stat => Number(stat.totalAvailable.totalUsdEquivalent.toFixed(2))) ?? [];
  const grantedSeries = stats?.map(stat => Number(stat.totalGranted.totalUsdEquivalent.toFixed(2))) ?? [];
  const rewardedSeries = stats?.map(stat => Number(stat.totalRewarded.totalUsdEquivalent.toFixed(2))) ?? [];

  const { options } = useColumnChartOptions({
    categories,
    series: [
      {
        name: "Received",
        data: receivedSeries,
      },
      {
        name: "Granted",
        data: grantedSeries,
      },
      {
        name: "Rewarded",
        data: rewardedSeries,
      },
    ],
    legend: {
      enabled: false,
    },
    tooltip: {
      valueSuffix: " USD",
    },
  });

  if (!receivedSeries.length && !grantedSeries.length && !rewardedSeries.length) {
    return <div>Empty state</div>;
  }

  return (
    <Paper size={"s"} container={"2"} border={"none"} classNames={{ base: "flex flex-col gap-4 h-[300px]" }}>
      <ColumnChart options={options} />
      <ChartFooter />
    </Paper>
  );
}

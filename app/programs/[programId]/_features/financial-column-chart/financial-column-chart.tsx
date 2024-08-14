import { useParams } from "next/navigation";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";

import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ColumnChart } from "@/shared/components/charts/highcharts/column-chart/column-chart";
import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FinancialColumnChart() {
  const { programId = "" } = useParams<{ programId: string }>();
  const { data } = ProgramReactQueryAdapter.client.useGetProgramsTransactionsStats({
    pathParams: {
      programId,
    },
  });

  const { stats } = data ?? {};
  const { format: formatDate } = bootstrap.getDateKernelPort();
  const { format, getCurrency } = bootstrap.getMoneyKernelPort();

  const categories = stats?.map(stat => formatDate(new Date(stat.date), "MMMM yyyy")) ?? [];
  const receivedSeries = stats?.map(stat => Number(stat.totalAvailable.totalUsdEquivalent.toFixed(2))) ?? [];
  const receivedAmount = `${
    format({
      amount: receivedSeries.reduce((a, c) => a + c),
      currency: getCurrency("USD"),
    }).amount
  } ${
    format({
      amount: receivedSeries.reduce((a, c) => a + c),
      currency: getCurrency("USD"),
    }).code
  }`;
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
    <Paper size={"s"} container={"2"} border={"none"} classNames={{ base: "flex flex-col gap-4" }}>
      <ColumnChart options={options} />
      <Paper size={"s"} classNames={{ base: "flex gap-4" }}>
        <div className="grid grid-cols-3 justify-between gap-4">
          <ChartLegend colors="brand-4">
            <Translate token={"programs:financialColumnChart.legends.received"} />
          </ChartLegend>
          <Typo weight={"medium"}>{receivedAmount}</Typo>
        </div>
      </Paper>
    </Paper>
  );
}

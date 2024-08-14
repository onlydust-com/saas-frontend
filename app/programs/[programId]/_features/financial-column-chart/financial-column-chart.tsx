import { useParams } from "next/navigation";
import { useMemo } from "react";

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
  const receivedAmountSum = receivedSeries.length ? receivedSeries.reduce((a, c) => a + c) : 0;
  const renderReceivedAmount = useMemo(() => {
    return (
      <div className="flex gap-1">
        <Typo size={"xs"} color={"text-1"}>
          {
            format({
              amount: receivedAmountSum,
              currency: getCurrency("USD"),
            }).amount
          }
        </Typo>
        <Typo size={"xs"} color={"text-2"}>
          {
            format({
              amount: receivedAmountSum,
              currency: getCurrency("USD"),
            }).code
          }
        </Typo>
      </div>
    );
  }, [receivedAmountSum, format, getCurrency]);

  const grantedSeries = stats?.map(stat => Number(stat.totalGranted.totalUsdEquivalent.toFixed(2))) ?? [];
  const grantedAmountSum = grantedSeries.length ? grantedSeries.reduce((a, c) => a + c) : 0;
  const renderGrantedAmount = useMemo(() => {
    return (
      <div className="flex gap-1">
        <Typo size={"xs"} color={"text-1"}>
          {
            format({
              amount: grantedAmountSum,
              currency: getCurrency("USD"),
            }).amount
          }
        </Typo>
        <Typo size={"xs"} color={"text-2"}>
          {
            format({
              amount: grantedAmountSum,
              currency: getCurrency("USD"),
            }).code
          }
        </Typo>
      </div>
    );
  }, [grantedAmountSum, format, getCurrency]);

  const rewardedSeries = stats?.map(stat => Number(stat.totalRewarded.totalUsdEquivalent.toFixed(2))) ?? [];
  const rewardedAmountSum = rewardedSeries.length ? rewardedSeries.reduce((a, c) => a + c) : 0;
  const renderRewardedAmount = useMemo(() => {
    return (
      <div className="flex gap-1">
        <Typo size={"xs"} color={"text-1"}>
          {
            format({
              amount: rewardedAmountSum,
              currency: getCurrency("USD"),
            }).amount
          }
        </Typo>
        <Typo size={"xs"} color={"text-2"}>
          {
            format({
              amount: rewardedAmountSum,
              currency: getCurrency("USD"),
            }).code
          }
        </Typo>
      </div>
    );
  }, [rewardedAmountSum, format, getCurrency]);

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
        <div>Date Range popover</div>
      </div>
    </Paper>
  );
}

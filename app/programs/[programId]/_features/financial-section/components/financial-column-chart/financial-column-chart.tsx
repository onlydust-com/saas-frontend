import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { useFinancialColumnChart } from "@/app/programs/[programId]/_features/financial-section/components/financial-column-chart/financial-column-chart.hooks";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Dropdown } from "@/design-system/atoms/dropdown";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { ColumnChart } from "@/shared/components/charts/highcharts/column-chart/column-chart";
import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FinancialColumnChart() {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { programId = "" } = useParams<{ programId: string }>();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_WEEK);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramTransactionsStats({
    pathParams: { programId },
    queryParams: {
      fromDate,
      toDate,
    },
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

  function onChangeRangeType(value: string[]) {
    setRangeType(value[0] as DateRangeType);
  }

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: "w-full min-h-[400px]",
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
    <div className="flex min-h-[400px] flex-col gap-4">
      <ColumnChart options={options} />
      <div className="flex items-center gap-4">
        <Paper size={"s"} classNames={{ base: "grid grid-cols-3 items-center gap-3 flex-1" }}>
          <div className="flex items-center justify-between gap-4">
            <ChartLegend color="chart-1">
              <Translate token={"programs:financialColumnChart.legends.received"} />
            </ChartLegend>
            {renderReceivedAmount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="chart-4">
              <Translate token={"programs:financialColumnChart.legends.granted"} />
            </ChartLegend>
            {renderGrantedAmount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="chart-3">
              <Translate token={"programs:financialColumnChart.legends.rewarded"} />
            </ChartLegend>
            {renderRewardedAmount}
          </div>
        </Paper>
        <Dropdown
          isMultipleSelection={false}
          selectedKeys={[rangeType]}
          onChange={onChangeRangeType}
          items={[
            { label: <Translate token={"common:dateRangeType.LAST_WEEK"} />, value: DateRangeType.LAST_WEEK },
            { label: <Translate token={"common:dateRangeType.LAST_MONTH"} />, value: DateRangeType.LAST_MONTH },
            { label: <Translate token={"common:dateRangeType.LAST_SEMESTER"} />, value: DateRangeType.LAST_SEMESTER },
            { label: <Translate token={"common:dateRangeType.LAST_YEAR"} />, value: DateRangeType.LAST_YEAR },
            { label: <Translate token={"common:dateRangeType.ALL_TIME"} />, value: DateRangeType.ALL_TIME },
          ]}
        >
          {({ label }) => (
            <Button variant={"secondary-light"} size={"l"} startIcon={{ name: "ri-calendar-line" }}>
              {label || <Translate token={"common:dateRangeType.LAST_WEEK"} />}
            </Button>
          )}
        </Dropdown>
      </div>
    </div>
  );
}

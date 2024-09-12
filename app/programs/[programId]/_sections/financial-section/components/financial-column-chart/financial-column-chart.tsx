import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useFinancialColumnChart } from "@/app/programs/[programId]/_sections/financial-section/components/financial-column-chart/financial-column-chart.hooks";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";

import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";
import { Highcharts } from "@/shared/components/charts/highcharts/highcharts";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FinancialColumnChart() {
  const { t } = useTranslation();
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
      { name: t("programs:financialColumnChart.legends.received"), data: receivedSeries },
      { name: t("programs:financialColumnChart.legends.granted"), data: grantedSeries },
      { name: t("programs:financialColumnChart.legends.rewarded"), data: rewardedSeries },
    ],
    legend: { enabled: false },
    tooltip: { valueSuffix: " USD" },
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

  if (!receivedSeries.length && !grantedSeries.length && !rewardedSeries.length) {
    return (
      <EmptyState
        titleTranslate={{ token: "programs:financialColumnChart.emptyState.title" }}
        descriptionTranslate={{ token: "programs:financialColumnChart.emptyState.description" }}
      />
    );
  }

  return (
    <div className="flex min-h-[300px] flex-col gap-4">
      <Highcharts options={options} />
      <div className="flex items-center gap-4">
        <Paper size={"lg"} classNames={{ base: "grid grid-cols-3 items-center gap-3 flex-1" }} background={"secondary"}>
          <div className="flex items-center justify-between gap-4">
            <ChartLegend color="primary">
              <Translate token={"programs:financialColumnChart.legends.received"} />
            </ChartLegend>
            {renderReceivedAmount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="secondary">
              <Translate token={"programs:financialColumnChart.legends.granted"} />
            </ChartLegend>
            {renderGrantedAmount}
          </div>
          <div className="flex justify-between gap-4">
            <ChartLegend color="tertiary">
              <Translate token={"programs:financialColumnChart.legends.rewarded"} />
            </ChartLegend>
            {renderRewardedAmount}
          </div>
        </Paper>
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
    </div>
  );
}

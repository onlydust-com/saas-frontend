import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useFinancialColumnChart } from "@/app/manage-projects/[projectSlug]/_features/financial/financial-column-chart/financial-column-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { EmptyState } from "@/shared/components/empty-state/empty-state";

export function FinancialColumnChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(DateRangeType.LAST_YEAR);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [dateKernelPort]);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiStatsFinancials({
    queryParams: {
      fromDate,
      toDate,
      sort: "DATE",
      sortDirection: "ASC",
      showEmpty: true,
      projectSlug,
    },
  });

  const { stats } = data ?? {};

  const { categories, rewardedSeries, paidSeries } = useFinancialColumnChart(stats);

  const { options } = useColumnChartOptions({
    categories,
    series: [
      { name: t("manageProjects:financialColumnChart.legends.rewarded"), data: rewardedSeries },
      { name: t("manageProjects:financialColumnChart.legends.paid"), data: paidSeries },
    ],
    legend: { enabled: false },
    tooltip: {
      pointFormatter() {
        const { amount, code } = moneyKernelPort.format({
          amount: this.y,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return `<div class='flex gap-sm items-center'>
                  <div class='rounded h-3 min-h-3 w-3 min-w-3' style='background-color: ${this.color}'></div> 
                  <div class='text-typography-secondary'>${this.series.name}</div> 
                  <div class='font-medium'>${amount} ${code}</div>
                </div>`;
      },
    },
    height: 120,
  });

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: "w-full max-h-[150px]",
        }}
      />
    );
  }

  if (!paidSeries.length && !rewardedSeries.length) {
    return (
      <EmptyState
        titleTranslate={{ token: "manageProjects:financialColumnChart.emptyState.title" }}
        descriptionTranslate={{ token: "manageProjects:financialColumnChart.emptyState.description" }}
      />
    );
  }

  return (
    <Paper background={"secondary"} border={"none"} as={"div"} classNames={{ base: "h-full max-h-[150px] w-full" }}>
      <Typo size="sm" translate={{ token: "manageProjects:financialColumnChart.title" }} color={"secondary"} />
      <HighchartsDefault options={options} />
    </Paper>
  );
}

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useFinancialColumnChart } from "@/app/(saas)/my-dashboard/rewards/_features/financial-column-chart/financial-column-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export function FinancialColumnChart() {
  const { t } = useTranslation();

  const { githubUserId } = useAuthUser();

  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(DateRangeType.LAST_YEAR);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [dateKernelPort]);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiStatsFinancials({
    queryParams: {
      recipientId: githubUserId,
      showEmpty: true,
      fromDate,
      toDate,
    },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  const { stats } = data ?? {};

  const { categories, rewardedSeries, paidSeries } = useFinancialColumnChart(stats);

  const { options } = useColumnChartOptions({
    categories,
    series: [
      { name: t("myDashboard:financialColumnChart.legends.rewarded"), data: rewardedSeries },
      { name: t("myDashboard:financialColumnChart.legends.paid"), data: paidSeries },
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
    height: 130,
  });

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: "w-full max-h-[180px] col-span-1 tablet:col-span-2 desktop:col-span-1",
        }}
      />
    );
  }

  if (!rewardedSeries.length && !paidSeries.length) {
    return (
      <EmptyState
        titleTranslate={{ token: "myDashboard:financialColumnChart.emptyState.title" }}
        descriptionTranslate={{ token: "myDashboard:financialColumnChart.emptyState.description" }}
      />
    );
  }

  return (
    <Paper
      background={"secondary"}
      border={"none"}
      as={"div"}
      classNames={{ base: "h-full max-h-[180px] w-full col-span-1 gap-sm tablet:col-span-2 desktop:col-span-1" }}
    >
      <Typo size="sm" translate={{ token: "manageProjects:financialColumnChart.title" }} color={"secondary"} />
      <HighchartsDefault options={options} />
    </Paper>
  );
}

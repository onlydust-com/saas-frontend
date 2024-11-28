import { Calendar, ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useBudgetInTimeChart } from "@/app/financials/[sponsorId]/financial/_features/budget-in-time/budget-in-time.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { useAreaSplineChartOptions } from "@/shared/components/charts/highcharts/areaspline-chart/areaspline-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function BudgetInTime() {
  const { t } = useTranslation();
  const rangeMenu = useRangeSelectOptions();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { sponsorId = "" } = useParams<{ sponsorId: string }>();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_YEAR);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiStatsFinancials({
    queryParams: {
      fromDate,
      toDate,
      sort: "DATE",
      sortDirection: "ASC",
      showEmpty: true,
      sponsorId,
    },
  });

  const { stats } = data ?? {};

  const { categories, allocatedSeries, grantedSeries, rewardedSeries } = useBudgetInTimeChart(stats);

  const { options } = useAreaSplineChartOptions({
    categories,
    series: [
      { name: t("financials:details.financial.budgetInTime.legend.allocated"), data: allocatedSeries },
      { name: t("financials:details.financial.budgetInTime.legend.granted"), data: grantedSeries },
      { name: t("financials:details.financial.budgetInTime.legend.rewarded"), data: rewardedSeries },
    ],
    legend: { enabled: false },
    tooltip: {
      pointFormatter() {
        const { amount, code } = moneyKernelPort.format({
          amount: this.y,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return `<div><span style="color:${this.color}">\u25CF</span> <span class='text-typography-secondary'>${this.series.name}</span> <span class='font-medium'>${amount} ${code}</span</div>`;
      },
    },
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

  if (!allocatedSeries.length && !grantedSeries.length && !rewardedSeries.length) {
    return (
      <EmptyState
        titleTranslate={{ token: "financials:details.financial.budgetInTime.empty.title" }}
        descriptionTranslate={{ token: "financials:details.financial.budgetInTime.empty.description" }}
      />
    );
  }

  return (
    <Paper border={"primary"}>
      <div className="flex min-h-[300px] flex-col gap-lg">
        <div className="flex items-center justify-between gap-lg">
          <Typo
            weight={"medium"}
            size={"md"}
            color={"primary"}
            translate={{ token: "financials:details.financial.budgetInTime.title" }}
          />

          <Menu
            items={rangeMenu}
            selectedIds={[rangeType]}
            onAction={onChangeRangeType}
            isPopOver
            placement={"bottom-end"}
          >
            <Button
              variant={"secondary"}
              size={"sm"}
              startIcon={{ component: Calendar }}
              endIcon={{ component: ChevronDown }}
              translate={{ token: `common:dateRangeType.${rangeType}` }}
            />
          </Menu>
        </div>

        <HighchartsDefault options={options} />

        <div className={"flex items-center gap-xl"}>
          <ChartLegend color="areaspline-primary">
            <Translate token={"financials:details.financial.budgetInTime.legend.allocated"} />
          </ChartLegend>

          <ChartLegend color="areaspline-secondary">
            <Translate token={"financials:details.financial.budgetInTime.legend.granted"} />
          </ChartLegend>

          <ChartLegend color="areaspline-tertiary">
            <Translate token={"financials:details.financial.budgetInTime.legend.rewarded"} />
          </ChartLegend>
        </div>
      </div>
    </Paper>
  );
}

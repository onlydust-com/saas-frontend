import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useFinancialColumnChart } from "@/app/programs/[programId]/_sections/financial-section/components/financial-column-chart/financial-column-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";

import { useColumnChartOptions } from "@/shared/components/charts/highcharts/column-chart/column-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FinancialColumnChart() {
  const { t } = useTranslation();
  const rangeMenu = useRangeSelectOptions();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { programId = "" } = useParams<{ programId: string }>();
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
      programId,
    },
  });

  const { stats } = data ?? {};

  const { categories, allocatedSeries, grantedSeries, rewardedSeries } = useFinancialColumnChart(stats);

  const { options } = useColumnChartOptions({
    categories,
    series: [
      { name: t("programs:financialColumnChart.legends.allocated"), data: allocatedSeries },
      { name: t("programs:financialColumnChart.legends.granted"), data: grantedSeries },
      { name: t("programs:financialColumnChart.legends.rewarded"), data: rewardedSeries },
    ],
    legend: { enabled: false },
    tooltip: {
      pointFormatter() {
        const { amount, code } = moneyKernelPort.format({
          amount: this.y,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return `<div><span class='text-typography-secondary'>${this.series.name}</span> <span class='font-medium'>${amount} ${code}</span</div>`;
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
        titleTranslate={{ token: "programs:financialColumnChart.emptyState.title" }}
        descriptionTranslate={{ token: "programs:financialColumnChart.emptyState.description" }}
      />
    );
  }

  return (
    <div className="flex min-h-[300px] flex-col gap-4">
      <HighchartsDefault options={options} />
      <div className="flex items-center gap-4">
        <Paper
          size={"lg"}
          classNames={{ base: "grid tablet:grid-cols-3 tablet:items-center gap-3 flex-1" }}
          background={"secondary"}
        >
          <ChartLegend color="primary">
            <Translate token={"programs:financialColumnChart.legends.allocated"} />
          </ChartLegend>

          <ChartLegend color="secondary">
            <Translate token={"programs:financialColumnChart.legends.granted"} />
          </ChartLegend>

          <ChartLegend color="tertiary">
            <Translate token={"programs:financialColumnChart.legends.rewarded"} />
          </ChartLegend>
        </Paper>
        <Menu
          items={rangeMenu}
          selectedIds={[rangeType]}
          onAction={onChangeRangeType}
          isPopOver
          placement={"bottom-end"}
        >
          <div>
            <Button variant={"secondary"} size={"md"} startIcon={{ component: Calendar }}>
              <Translate token={`common:dateRangeType.${rangeType}`} />
            </Button>
          </div>
        </Menu>
      </div>
    </div>
  );
}

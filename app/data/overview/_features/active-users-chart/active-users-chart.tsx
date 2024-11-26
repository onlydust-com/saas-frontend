import { useTranslation } from "react-i18next";

import { useGlobalDataFilter } from "@/app/data/_features/global-data-filter/global-data-filter.context";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useMapChartOptions } from "@/shared/components/charts/highcharts/map-chart/map-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";

export function ActiveUsersChart() {
  const { t } = useTranslation();
  const { selectedProgramAndEcosystem, period } = useGlobalDataFilter();

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiWorldMap({
    queryParams: {
      fromDate: period.from,
      toDate: period.to,
      kpi: "ACTIVE_CONTRIBUTORS",
      ...(selectedProgramAndEcosystem.length && { dataSourceIds: selectedProgramAndEcosystem }),
    },
  });

  const { options } = useMapChartOptions({
    title: t("data:activeUsers.legends.contributors"),
    series: [
      {
        name: t("data:activeUsers.legends.contributors"),
        data: data?.map(item => item.getChartFormattedData(item)) ?? [],
      },
    ],
  });

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: "w-full min-h-[300px]",
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        titleTranslate={{ token: "data:activeUsers.emptyState.title" }}
        descriptionTranslate={{ token: "data:activeUsers.emptyState.description" }}
      />
    );
  }

  return (
    <div className="flex min-h-[300px] flex-col gap-4">
      <Paper size={"xs"} background={"secondary"}>
        <HighchartsDefault options={options} constructorType={"mapChart"} />
      </Paper>
    </div>
  );
}

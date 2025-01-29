import { useTranslation } from "react-i18next";

import { useGlobalDataFilter } from "@/app/(saas)/data/_features/global-data-filter/global-data-filter.context";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { useBarChartOptions } from "@/shared/components/charts/highcharts/bar-chart/bar-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { EmptyState } from "@/shared/components/empty-state/empty-state";

export function ActiveUsersBarChart() {
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

  const { options } = useBarChartOptions({
    categories: data?.countries?.map(item => item.countryName) ?? [],
    series: [
      {
        name: t("data:activeUsers.legends.contributors"),
        data: data?.countries?.map(item => item.value) ?? [],
      },
    ],
    height: data?.countries?.length ? data?.countries?.length * 36 : 300,
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

  return <HighchartsDefault options={options} constructorType={"mapChart"} />;
}

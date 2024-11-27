import { useTranslation } from "react-i18next";

import { useGlobalDataFilter } from "@/app/data/_features/global-data-filter/global-data-filter.context";

import { useBarChartOptions } from "@/shared/components/charts/highcharts/bar-chart/bar-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { EmptyState } from "@/shared/components/empty-state/empty-state";

export function ActiveUsersBarChart() {
  const { t } = useTranslation();
  const { selectedProgramAndEcosystem, period } = useGlobalDataFilter();

  // const { data, isLoading } = BiReactQueryAdapter.client.useGetBiWorldMap({
  //   queryParams: {
  //     fromDate: period.from,
  //     toDate: period.to,
  //     kpi: "ACTIVE_CONTRIBUTORS",
  //     ...(selectedProgramAndEcosystem.length && { dataSourceIds: selectedProgramAndEcosystem }),
  //   },
  // });

  const data = [
    {
      countryCode: "FR",
      countryName: "France",
      value: 1,
    },
    {
      countryCode: "DE",
      countryName: "Germany",
      value: 2,
    },
    {
      countryCode: "GB",
      countryName: "United Kingdom",
      value: 10,
    },
    {
      countryCode: "US",
      countryName: "United States",
      value: 4,
    },
    {
      countryCode: "CA",
      countryName: "Canada",
      value: 5,
    },
    {
      countryCode: "BR",
      countryName: "Brazil",
      value: 6,
    },
    {
      countryCode: "RU",
      countryName: "Russia",
      value: 7,
    },
    {
      countryCode: "CN",
      countryName: "China",
      value: 8,
    },
    {
      countryCode: "IN",
      countryName: "India",
      value: 9,
    },
    {
      countryCode: "AU",
      countryName: "Australia",
      value: 10,
    },
    {
      countryCode: "JP",
      countryName: "Japan",
      value: 55,
    },
    {
      countryCode: "KR",
      countryName: "South Korea",
      value: 6,
    },
    {
      countryCode: "SA",
      countryName: "Saudi Arabia",
      value: 5,
    },
    {
      countryCode: "ZA",
      countryName: "South Africa",
      value: 70,
    },
    {
      countryCode: "NG",
      countryName: "Nigeria",
      value: 75,
    },
    {
      countryCode: "EG",
      countryName: "Egypt",
      value: 8,
    },
    {
      countryCode: "ID",
      countryName: "Indonesia",
      value: 85,
    },
    {
      countryCode: "MX",
      countryName: "Mexico",
      value: 9,
    },
    {
      countryCode: "TR",
      countryName: "Turkey",
      value: 95,
    },
    {
      countryCode: "AR",
      countryName: "Argentina",
      value: 95,
    },
  ];

  const { options } = useBarChartOptions({
    categories: data?.map(item => item.countryName) ?? [],
    series: [
      {
        name: t("data:activeUsers.legends.contributors"),
        data: data?.map(item => item.value) ?? [],
      },
    ],
    height: data.length * 36,
  });

  // if (isLoading) {
  //   return (
  //     <Skeleton
  //       classNames={{
  //         base: "w-full min-h-[300px]",
  //       }}
  //     />
  //   );
  // }

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

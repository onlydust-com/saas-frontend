import { useGlobalDataFilter } from "@/app/data/_features/global-data-filter/global-data-filter.context";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Alert } from "@/design-system/molecules/alert";

import { Translate } from "@/shared/translation/components/translate/translate";

export function ActiveContributorsAlert() {
  const { selectedProgramAndEcosystem, period } = useGlobalDataFilter();

  const { data } = BiReactQueryAdapter.client.useGetBiWorldMap({
    queryParams: {
      fromDate: period.from,
      toDate: period.to,
      kpi: "ACTIVE_CONTRIBUTORS",
      ...(selectedProgramAndEcosystem.length && { dataSourceIds: selectedProgramAndEcosystem }),
    },
  });

  const totalContributors = data?.totalContributorCount ?? 0;
  const totalCountriesWithKyc = data?.totalContributorWithCountryCount ?? 0;

  return (
    <Alert
      hasIcon={false}
      color="white"
      title={<Translate token="data:activeUsers.alert.title" />}
      description={<Translate token="data:activeUsers.alert.description" />}
      endContent={
        <Paper background="tertiary" border={"primary-alt"} classNames={{ base: "flex flex-col gap-md h-fit w-fit" }}>
          <Typo
            size={"xs"}
            color={"primary"}
            translate={{ token: "data:activeUsers.alert.totalContributorsWithBillingProfiles" }}
          />
          <Typo variant={"heading"} size={"sm"} color={"primary"}>
            {totalCountriesWithKyc} / {totalContributors}
          </Typo>
        </Paper>
      }
    />
  );
}

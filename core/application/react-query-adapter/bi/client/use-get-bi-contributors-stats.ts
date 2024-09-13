import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBiContributorsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiContributorsStats({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<BiFacadePort["getBiContributorsStats"], GetBiContributorsStatsModel>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...biStoragePort.getBiContributorsStats({ pathParams, queryParams }),
      options: {
        ...options,
      },
    })
  );
}

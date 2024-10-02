import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBiStatsFinancialsModel } from "@/core/domain/bi/bi-contract.types";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiStatsFinancials({
  queryParams,
  options,
}: UseQueryFacadeParams<BiFacadePort["getBiStatsFinancials"], GetBiStatsFinancialsModel>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...biStoragePort.getBiStatsFinancials({ queryParams }),
      options: {
        ...options,
      },
    })
  );
}

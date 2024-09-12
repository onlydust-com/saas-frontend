import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiProjectsStats({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<BiFacadePort["getBiProjectsStats"], GetBiProjectsStatsModel>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...biStoragePort.getBiProjectsStats({ pathParams, queryParams }),
      options: {
        ...options,
      },
    })
  );
}

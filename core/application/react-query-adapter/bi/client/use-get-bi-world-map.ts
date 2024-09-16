import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBiWorldsMapResponse } from "@/core/domain/bi/bi-contract.types";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiWorldMap({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<BiFacadePort["getBiWorldMap"], GetBiWorldsMapResponse>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...biStoragePort.getBiWorldMap({ pathParams, queryParams }),
      options: {
        ...options,
      },
    })
  );
}

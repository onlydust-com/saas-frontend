import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectVisitorsModel } from "@/core/domain/bi/bi-contract.types";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiProjectVisitors({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<BiFacadePort["getBiProjectVisitors"], GetBiProjectVisitorsModel>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...biStoragePort.getBiProjectVisitors({ pathParams, queryParams }),
      options: {
        ...options,
      },
    })
  );
}

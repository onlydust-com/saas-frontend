import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectAcquisitionModel } from "@/core/domain/bi/bi-contract.types";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiProjectAcquisition({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<BiFacadePort["getBiProjectAcquisition"], GetBiProjectAcquisitionModel>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...biStoragePort.getBiProjectAcquisition({ pathParams, queryParams }),
      options: {
        ...options,
      },
    })
  );
}

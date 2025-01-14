import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetEcosystemsModel } from "@/core/domain/ecosystem/ecosystem-contract.types";
import { EcosystemFacadePort } from "@/core/domain/ecosystem/input/ecosystem-facade-port";

export function useGetEcosystems({
  options,
  queryParams,
}: UseInfiniteQueryFacadeParams<EcosystemFacadePort["getEcosystems"], GetEcosystemsModel>) {
  const ecosystemStoragePort = bootstrap.getEcosystemStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<EcosystemFacadePort["getEcosystems"], GetEcosystemsModel>({
      queryParams,
      options,
      httpStorage: ecosystemStoragePort.getEcosystems,
    })
  );
}

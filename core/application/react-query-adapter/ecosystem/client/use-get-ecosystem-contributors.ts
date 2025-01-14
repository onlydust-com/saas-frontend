import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetEcosystemContributorsModel } from "@/core/domain/ecosystem/ecosystem-contract.types";
import { EcosystemFacadePort } from "@/core/domain/ecosystem/input/ecosystem-facade-port";

export function useGetEcosystemContributors({
  options,
  pathParams,
  queryParams,
}: UseInfiniteQueryFacadeParams<EcosystemFacadePort["getEcosystemContributors"], GetEcosystemContributorsModel>) {
  const ecosystemStoragePort = bootstrap.getEcosystemStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<EcosystemFacadePort["getEcosystemContributors"], GetEcosystemContributorsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: ecosystemStoragePort.getEcosystemContributors,
    })
  );
}

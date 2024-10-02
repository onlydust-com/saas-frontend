import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SearchEcosystemsModel } from "@/core/domain/ecosystem/ecosystem-contract.types";
import { EcosystemFacadePort } from "@/core/domain/ecosystem/input/ecosystem-facade-port";

export function useSearchEcosystems({
  options,
  pathParams,
  queryParams,
}: UseInfiniteQueryFacadeParams<EcosystemFacadePort["searchEcosystems"], SearchEcosystemsModel>) {
  const ecosystemStoragePort = bootstrap.getEcosystemStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<EcosystemFacadePort["searchEcosystems"], SearchEcosystemsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: ecosystemStoragePort.searchEcosystems,
    })
  );
}

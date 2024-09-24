import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBiContributorsModel } from "@/core/domain/bi/bi-contract.types";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiContributors({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<BiFacadePort["getBiContributors"], GetBiContributorsModel>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<BiFacadePort["getBiContributors"], GetBiContributorsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: biStoragePort.getBiContributors,
    })
  );
}

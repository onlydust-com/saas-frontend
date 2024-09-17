import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectsModel } from "@/core/domain/bi/bi-contract.types";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiProjects({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<BiFacadePort["getBiProjects"], GetBiProjectsModel>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<BiFacadePort["getBiProjects"], GetBiProjectsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: biStoragePort.getBiProjects,
    })
  );
}

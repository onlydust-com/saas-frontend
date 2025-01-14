import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetEcosystemProjectsModel } from "@/core/domain/ecosystem/ecosystem-contract.types";
import { EcosystemFacadePort } from "@/core/domain/ecosystem/input/ecosystem-facade-port";

export function useGetEcosystemProjects({
  options,
  pathParams,
  queryParams,
}: UseInfiniteQueryFacadeParams<EcosystemFacadePort["getEcosystemProjects"], GetEcosystemProjectsModel>) {
  const ecosystemStoragePort = bootstrap.getEcosystemStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<EcosystemFacadePort["getEcosystemProjects"], GetEcosystemProjectsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: ecosystemStoragePort.getEcosystemProjects,
    })
  );
}

import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { GetMyProjectsAsMaintainerModel } from "@/core/domain/me/me-contract.types";
import { MeStoragePort } from "@/core/domain/me/outputs/me-storage-port";

export function useGetMyProjectsAsMaintainer({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<MeStoragePort["getMyProjectsAsMaintainer"], GetMyProjectsAsMaintainerModel>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<MeFacadePort["getMyProjectsAsMaintainer"], GetMyProjectsAsMaintainerModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: meStoragePort.getMyProjectsAsMaintainer,
    })
  );
}

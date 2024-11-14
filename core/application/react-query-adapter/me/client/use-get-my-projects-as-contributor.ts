import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { GetMyProjectsAsContributorModel } from "@/core/domain/me/me-contract.types";
import { MeStoragePort } from "@/core/domain/me/outputs/me-storage-port";

export function useGetMyProjectsAsContributor({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<MeStoragePort["getMyProjectsAsContributor"], GetMyProjectsAsContributorModel>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<MeFacadePort["getMyProjectsAsContributor"], GetMyProjectsAsContributorModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: meStoragePort.getMyProjectsAsContributor,
    })
  );
}

import { useInfiniteQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { GetContributorProjectsModel } from "@/core/domain/contributor/contributor-contract.types";
import { ContributorFacadePort } from "@/core/domain/contributor/input/contributor-facade-port";
import { ContributorStoragePort } from "@/core/domain/contributor/outputs/contributor-storage-port";

import { UseInfiniteQueryFacadeParams, useInfiniteQueryAdapter } from "../../helpers/use-infinite-query-adapter";

export function useGetContributorProjects({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ContributorFacadePort["getContributorProjects"], GetContributorProjectsModel>) {
  const contributorStoragePort = bootstrap.getContributorStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ContributorStoragePort["getContributorProjects"], GetContributorProjectsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: contributorStoragePort.getContributorProjects,
    })
  );
}

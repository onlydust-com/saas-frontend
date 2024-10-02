import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetMyOrganizationsModel } from "@/core/domain/github/github-contract.types";
import { GithubStoragePort } from "@/core/domain/github/outputs/github-storage-port";

export function useGetMyOrganizations({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<GithubStoragePort["getMyOrganizations"], GetMyOrganizationsModel>) {
  const githubStoragePort = bootstrap.getGithubStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...githubStoragePort.getMyOrganizations({
        pathParams,
        queryParams,
      }),
      options,
    })
  );
}

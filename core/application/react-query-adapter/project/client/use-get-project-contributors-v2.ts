import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectContributorsV2Model } from "@/core/domain/project/project-contract.types";

export function useGetProjectContributorsV2({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjectContributorsV2"], GetProjectContributorsV2Model>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectContributorsV2"], GetProjectContributorsV2Model>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectContributorsV2,
    })
  );
}

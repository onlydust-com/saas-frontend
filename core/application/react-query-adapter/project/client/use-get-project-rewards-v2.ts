import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectRewardsV2Model } from "@/core/domain/project/project-contract.types";

export function useGetProjectRewardsV2({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjectRewardsV2"], GetProjectRewardsV2Model>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectRewardsV2"], GetProjectRewardsV2Model>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectRewardsV2,
    })
  );
}

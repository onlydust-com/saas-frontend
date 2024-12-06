import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectsV2Model } from "@/core/domain/project/project-contract.types";

export function useGetProjectsV2({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjectsV2"], GetProjectsV2Model>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectsV2"], GetProjectsV2Model>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectsV2,
    })
  );
}

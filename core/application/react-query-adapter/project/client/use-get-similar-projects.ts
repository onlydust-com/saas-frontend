import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetSimilarProjectsModel } from "@/core/domain/project/project-contract.types";

export function useGetSimilarProjects({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getSimilarProjects"], GetSimilarProjectsModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getSimilarProjects"], GetSimilarProjectsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getSimilarProjects,
    })
  );
}

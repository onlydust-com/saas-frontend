import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectsModel } from "@/core/domain/project/project-contract.types";

export function useGetProjects({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjects"], GetProjectsModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjects"], GetProjectsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjects,
    })
  );
}

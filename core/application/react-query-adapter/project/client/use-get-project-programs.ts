import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectProgramsModel } from "@/core/domain/project/project-contract.types";

export function useGetProjectPrograms({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjectPrograms"], GetProjectProgramsModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectPrograms"], GetProjectProgramsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectPrograms,
    })
  );
}

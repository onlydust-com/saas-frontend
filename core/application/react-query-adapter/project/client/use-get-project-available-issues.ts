import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectAvailableIssuesModel } from "@/core/domain/project/project-contract.types";

export function useGetProjectAvailableIssues({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjectAvailableIssues"], GetProjectAvailableIssuesModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectAvailableIssues"], GetProjectAvailableIssuesModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectAvailableIssues,
    })
  );
}
  

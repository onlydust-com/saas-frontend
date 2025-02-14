import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectGoodFirstIssuesModel } from "@/core/domain/project/project-contract.types";

export function useGetProjectGoodFirstIssues({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjectGoodFirstIssues"], GetProjectGoodFirstIssuesModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectGoodFirstIssues"], GetProjectGoodFirstIssuesModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectGoodFirstIssues,
    })
  );
}

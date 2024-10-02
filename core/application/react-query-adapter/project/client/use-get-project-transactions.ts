import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectTransactionsModel } from "@/core/domain/project/project-contract.types";

export function useGetProjectTransactions({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProjectFacadePort["getProjectTransactions"], GetProjectTransactionsModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectTransactions"], GetProjectTransactionsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: projectStoragePort.getProjectTransactions,
    })
  );
}

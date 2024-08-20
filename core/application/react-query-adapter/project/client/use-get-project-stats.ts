import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { ProjectStatsInterface } from "@/core/domain/project/models/project-stats-model";

export function useGetProjectStats({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectStats"], ProjectStatsInterface>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectStats({ pathParams, queryParams }),
      options,
    })
  );
}

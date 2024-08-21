import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { ProjectInterface } from "@/core/domain/project/models/project-model";

export function useGetProjectById({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectById"], ProjectInterface>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectById({ pathParams, queryParams }),
      options,
    })
  );
}

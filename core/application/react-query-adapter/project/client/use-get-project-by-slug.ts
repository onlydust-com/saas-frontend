import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { ProjectInterface } from "@/core/domain/project/models/project-model";

export function useGetProjectBySlug({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectBySlug"], ProjectInterface>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectBySlug({ pathParams, queryParams }),
      options,
    })
  );
}

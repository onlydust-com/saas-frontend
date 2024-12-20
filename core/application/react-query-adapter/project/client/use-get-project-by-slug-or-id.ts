import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

export function useGetProjectBySlugOrId({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectBySlugOrIdV2"], ProjectInterfaceV2>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectBySlugOrIdV2({ pathParams, queryParams }),
      options,
    })
  );
}

import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { GetProjectActivityResponse } from "@/core/domain/project/project-contract.types";

export function useGetProjectActivityBySlugOrId({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<ProjectStoragePort["getProjectActivity"], GetProjectActivityResponse>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectActivity({ pathParams, queryParams }),
      options,
    })
  );
}

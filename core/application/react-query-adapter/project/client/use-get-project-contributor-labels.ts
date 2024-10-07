import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectContributorLabelsModel } from "@/core/domain/project/project-contract.types";

export function useGetProjectContributorLabels({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectContributorLabels"], GetProjectContributorLabelsModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectContributorLabels({ pathParams, queryParams }),
      options,
    })
  );
}

import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { ProjectFinancialInterface } from "@/core/domain/project/models/project-financial-model";

export function useGetProjectFinancialDetailsBySlug({
  options,
  pathParams,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectFinancialDetailsBySlug"], ProjectFinancialInterface>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectFinancialDetailsBySlug({ pathParams }),
      options,
    })
  );
}

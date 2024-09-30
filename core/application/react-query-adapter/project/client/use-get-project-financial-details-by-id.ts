import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { ProjectFinancialInterface } from "@/core/domain/project/models/project-financial-model";

export function useGetProjectFinancialDetailsById({
  options,
  pathParams,
}: UseQueryFacadeParams<ProjectFacadePort["getProjectFinancialDetailsById"], ProjectFinancialInterface>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectFinancialDetailsById({ pathParams }),
      options,
    })
  );
}

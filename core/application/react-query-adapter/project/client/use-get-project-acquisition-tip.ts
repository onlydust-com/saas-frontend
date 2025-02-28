import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { GetProjectAcquisitionTipResponse } from "@/core/domain/project/project-contract.types";

export function useGetProjectAcquisitionTip({
  pathParams,
  options,
}: UseQueryFacadeParams<ProjectStoragePort["getProjectAcquisitionTip"], GetProjectAcquisitionTipResponse>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getProjectAcquisitionTip({ pathParams }),
      options,
    })
  );
}

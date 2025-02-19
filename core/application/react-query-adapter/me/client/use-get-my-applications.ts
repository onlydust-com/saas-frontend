import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { MeApplicationsInterface } from "@/core/domain/me/models/me-application";

export function useGetMyApplications({
  options,
}: UseQueryFacadeParams<MeFacadePort["getMyApplications"], MeApplicationsInterface>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getMyApplications({}),
      options,
    })
  );
}

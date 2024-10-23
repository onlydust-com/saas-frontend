import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { MeOrganizationInterface } from "@/core/domain/me/models/me-organization-model";

export function useGetMyOrganizations({
  options,
}: UseQueryFacadeParams<MeFacadePort["getMyOrganizations"], MeOrganizationInterface[]>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getMyOrganizations({}),
      options,
    })
  );
}

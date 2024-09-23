import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { MeProfileInterface } from "@/core/domain/me/models/me-profile-model";

export function useGetMyProfile({ options }: UseQueryFacadeParams<MeFacadePort["getMyProfile"], MeProfileInterface>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getMyProfile({}),
      options,
    })
  );
}

import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { GetMyPayoutPreferencesModel } from "@/core/domain/me/me-contract.types";

export function useGetMyPayoutPreferences({
  options,
}: UseQueryFacadeParams<MeFacadePort["getMyPayoutPreferences"], GetMyPayoutPreferencesModel>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getMyPayoutPreferences({}),
      options,
    })
  );
}

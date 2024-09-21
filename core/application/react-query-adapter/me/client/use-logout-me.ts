import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";

export function useLogoutMe({ options }: UseMutationFacadeParams<MeFacadePort["logoutMe"], undefined, object>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.logoutMe({}),
      options,
    })
  );
}

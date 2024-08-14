import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UserFacadePort } from "@/core/domain/user/inputs/user-facade-port";

export function useLogoutMe({ options }: UseMutationFacadeParams<UserFacadePort["logoutMe"], undefined, object>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...userStoragePort.logoutMe({}),
      options,
    })
  );
}

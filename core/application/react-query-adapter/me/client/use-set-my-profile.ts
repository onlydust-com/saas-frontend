import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { SetMyProfileBody } from "@/core/domain/me/me-contract.types";
import { MeProfileInterface } from "@/core/domain/me/models/me-profile-model";

export function useSetMyProfile({
  options,
}: UseMutationFacadeParams<MeFacadePort["setMyProfile"], undefined, MeProfileInterface, SetMyProfileBody> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.setMyProfile({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: meStoragePort.getMyProfile({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

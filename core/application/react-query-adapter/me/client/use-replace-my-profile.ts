import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { ReplaceMyProfileBody } from "@/core/domain/me/me-contract.types";
import { MeProfileInterface } from "@/core/domain/me/models/me-profile-model";

export function useReplaceMyProfile({
  options,
}: UseMutationFacadeParams<
  MeFacadePort["replaceMyProfile"],
  undefined,
  MeProfileInterface,
  ReplaceMyProfileBody
> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.replaceMyProfile({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: meStoragePort.getMyProfile({}).tag,
            exact: false,
          });

          await queryClient.invalidateQueries({
            queryKey: meStoragePort.getMe({}).tag,
            exact: false,
          });
          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

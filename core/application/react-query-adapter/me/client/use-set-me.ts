import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { SetMeBody } from "@/core/domain/me/me-contract.types";
import { MeInterface } from "@/core/domain/me/models/me-model";

export function useSetMe({
  options,
}: UseMutationFacadeParams<MeFacadePort["setMe"], undefined, MeInterface, SetMeBody>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.setMe({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
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

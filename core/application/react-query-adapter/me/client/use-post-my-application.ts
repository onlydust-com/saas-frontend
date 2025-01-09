import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { PostMyApplicationBody } from "@/core/domain/me/me-contract.types";

export function usePostMyApplication({
  options,
}: UseMutationFacadeParams<MeFacadePort["postMyApplication"], undefined, never, PostMyApplicationBody> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.postMyApplication({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: meStoragePort.getMe({}).tag,
            exact: false,
          });

          await queryClient.invalidateQueries({
            queryKey: projectStoragePort.getProjectAvailableIssues({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

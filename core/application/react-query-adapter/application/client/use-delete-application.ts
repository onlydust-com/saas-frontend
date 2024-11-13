import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { DeleteApplicationBody } from "@/core/domain/application/application-contract.types";
import { ApplicationFacadePort } from "@/core/domain/application/input/application-facade-port";

export function useDeleteApplication({
  options,
}: UseMutationFacadeParams<ApplicationFacadePort["deleteApplication"], undefined, never, DeleteApplicationBody>) {
  const applicationStoragePort = bootstrap.getApplicationStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...applicationStoragePort.deleteApplication({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          // TODO invalidate application list query

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

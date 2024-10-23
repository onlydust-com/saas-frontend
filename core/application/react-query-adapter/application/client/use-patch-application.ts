import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { PatchApplicationBody } from "@/core/domain/application/application-contract.types";
import { ApplicationFacadePort } from "@/core/domain/application/input/application-facade-port";

export function usePatchApplication({
  pathParams,
  options,
}: UseMutationFacadeParams<ApplicationFacadePort["patchApplication"], undefined, never, PatchApplicationBody> = {}) {
  const applicationStoragePort = bootstrap.getApplicationStoragePortForClient();
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...applicationStoragePort.patchApplication({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: issueStoragePort.getIssueApplicants({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

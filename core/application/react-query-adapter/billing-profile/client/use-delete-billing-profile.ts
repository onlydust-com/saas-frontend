import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useDeleteBillingProfile({
  pathParams,
  options,
}: UseMutationFacadeParams<BillingProfileFacadePort["deleteBillingProfile"]> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.deleteBillingProfile({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries();

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

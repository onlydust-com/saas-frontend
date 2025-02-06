import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UpdateBillingProfilePayoutInfoBody } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useUpdateBillingProfilePayoutInfo({
  pathParams,
  options,
}: UseMutationFacadeParams<
  BillingProfileFacadePort["updateBillingProfilePayoutInfo"],
  undefined,
  never,
  UpdateBillingProfilePayoutInfoBody
> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.updateBillingProfilePayoutInfo({ pathParams }),
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

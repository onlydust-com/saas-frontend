import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useDeleteBillingProfileCoworker({
  pathParams,
  options,
}: UseMutationFacadeParams<BillingProfileFacadePort["deleteBillingProfileCoworker"], undefined, void, {}> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.deleteBillingProfileCoworker({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.billingProfileId) {
            // invalidate single billing profile request
            await queryClient.invalidateQueries({
              queryKey: billingProfileStoragePort.getBillingProfileById({
                pathParams: { billingProfileId: pathParams.billingProfileId },
              }).tag,
              exact: false,
            });

            // invalidate billing profile coworkers request
            await queryClient.invalidateQueries({
              queryKey: billingProfileStoragePort.getBillingProfileCoworkers({
                pathParams: { billingProfileId: pathParams?.billingProfileId },
              }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

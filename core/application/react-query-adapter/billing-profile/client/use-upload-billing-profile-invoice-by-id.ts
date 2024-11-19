import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useUploadBillingProfileInvoiceById({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<BillingProfileFacadePort["uploadBillingProfileInvoiceById"], undefined, Blob, Blob> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.uploadBillingProfileInvoiceById({ pathParams, queryParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: rewardStoragePort.getRewards({}).tag,
            exact: false,
          });
          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

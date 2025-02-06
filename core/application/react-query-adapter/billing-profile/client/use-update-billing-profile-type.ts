import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UpdateBillingProfileTypeBody } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useUpdateBillingProfileType({
  pathParams,
  options,
}: UseMutationFacadeParams<
  BillingProfileFacadePort["updateBillingProfileType"],
  undefined,
  never,
  UpdateBillingProfileTypeBody
> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.updateBillingProfileType({ pathParams }),
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
          }

          await queryClient.invalidateQueries({
            queryKey: billingProfileStoragePort.getMyBillingProfiles({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

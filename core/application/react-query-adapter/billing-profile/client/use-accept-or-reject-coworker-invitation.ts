import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { AcceptOrRejectCoworkerInvitationBody } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useAcceptOrRejectCoworkerInvitation({
  pathParams,
  options,
}: UseMutationFacadeParams<
  BillingProfileFacadePort["acceptOrRejectCoworkerInvitation"],
  undefined,
  never,
  AcceptOrRejectCoworkerInvitationBody
> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.acceptOrRejectCoworkerInvitation({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: billingProfileStoragePort.getMyBillingProfiles({}).tag,
            exact: false,
          });

          if (pathParams?.billingProfileId) {
            await queryClient.invalidateQueries({
              queryKey: billingProfileStoragePort.getBillingProfileById({
                pathParams: { billingProfileId: pathParams.billingProfileId },
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

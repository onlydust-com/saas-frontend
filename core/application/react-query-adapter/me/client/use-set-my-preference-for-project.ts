import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { SetMyPayoutPreferenceForProjectBody } from "@/core/domain/me/me-contract.types";

export function useSetMyPreferenceForProject({
  options,
}: UseMutationFacadeParams<
  MeFacadePort["setMyPayoutPreferenceForProject"],
  undefined,
  never,
  SetMyPayoutPreferenceForProjectBody
> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.setMyPayoutPreferenceForProject({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: meStoragePort.getMe({}).tag,
            exact: false,
          });

          // TODO: Invalidate my payout preferences

          await queryClient.invalidateQueries({
            queryKey: rewardStoragePort.getRewards({}).tag,
            exact: false,
          });

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

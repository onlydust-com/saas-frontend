import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { AddOtherWorkBody, AddOtherWorkModel } from "@/core/domain/reward/reward-contract.types";

export function useAddOtherWork({
  pathParams,
  options,
}: UseMutationFacadeParams<RewardFacadePort["addOtherWork"], undefined, AddOtherWorkModel, AddOtherWorkBody> = {}) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...rewardStoragePort.addOtherWork({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: contributionStoragePort.getContributions({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

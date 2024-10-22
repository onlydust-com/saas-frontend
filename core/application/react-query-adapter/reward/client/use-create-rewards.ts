import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { CreateRewardsBody, CreateRewardsResponse } from "@/core/domain/reward/reward-contract.types";

export function useCreateRewards({
  pathParams,
  options,
}: UseMutationFacadeParams<
  RewardFacadePort["createRewards"],
  undefined,
  CreateRewardsResponse,
  CreateRewardsBody
> = {}) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...rewardStoragePort.createRewards({ pathParams }),
      options: {
        ...options,
        onSuccess: (data, variables, context) => {
          queryClient.invalidateQueries();

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

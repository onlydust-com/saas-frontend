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
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...rewardStoragePort.createRewards({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.projectId) {
            await queryClient.invalidateQueries({
              queryKey: rewardStoragePort.getProjectRewards({ pathParams: { projectId: pathParams.projectId } }).tag,
              exact: false,
            });
          }

          await queryClient.invalidateQueries({
            queryKey: contributionStoragePort.getContributions({}).tag,
            exact: false,
          });

          await queryClient.invalidateQueries({
            queryKey: meStoragePort.getMe({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}

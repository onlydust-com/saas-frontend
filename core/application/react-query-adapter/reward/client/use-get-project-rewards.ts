import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { GetProjectRewardsModel } from "@/core/domain/reward/reward-contract.types";

export function useGetProjectRewards({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<RewardFacadePort["getProjectRewards"], GetProjectRewardsModel>) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<RewardFacadePort["getProjectRewards"], GetProjectRewardsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: rewardStoragePort.getProjectRewards,
    })
  );
}

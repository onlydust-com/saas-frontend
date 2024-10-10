import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { GetProjectRewardItemsModel } from "@/core/domain/reward/reward-contract.types";

export function useGetProjectRewardItems({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<RewardFacadePort["getProjectRewardItems"], GetProjectRewardItemsModel>) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<RewardFacadePort["getProjectRewardItems"], GetProjectRewardItemsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: rewardStoragePort.getProjectRewardItems,
    })
  );
}

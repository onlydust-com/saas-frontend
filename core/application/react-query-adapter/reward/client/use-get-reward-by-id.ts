import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { RewardListItemV2Interface } from "@/core/domain/reward/models/reward-list-item-v2-model";

export function useGetRewardId({
  options,
  pathParams,
}: UseQueryFacadeParams<RewardFacadePort["getRewardById"], RewardListItemV2Interface>) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...rewardStoragePort.getRewardById({ pathParams }),
      options,
    })
  );
}

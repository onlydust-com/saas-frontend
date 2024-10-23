import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { RewardInterface } from "@/core/domain/reward/models/reward-model";

export function useGetProjectReward({
  options,
  pathParams,
}: UseQueryFacadeParams<RewardFacadePort["getProjectReward"], RewardInterface>) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...rewardStoragePort.getProjectReward({ pathParams }),
      options,
    })
  );
}

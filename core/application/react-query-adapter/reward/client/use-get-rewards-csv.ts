import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";

export function useGetRewardsCsv({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<RewardFacadePort["getRewardsCsv"], undefined, Blob>) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...rewardStoragePort.getRewardsCsv({ pathParams, queryParams }),
      options,
    })
  );
}

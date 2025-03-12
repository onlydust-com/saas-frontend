import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetLeaderboardModel } from "@/core/domain/leaderboard/leaderboard-contract.types";
import { LeaderboardStoragePort } from "@/core/domain/leaderboard/outputs/leaderboard-storage-port";

export function useGetLeaderboard({
  options,
  queryParams,
}: UseQueryFacadeParams<LeaderboardStoragePort["getLeaderboard"], GetLeaderboardModel>) {
  const leaderboardStoragePort = bootstrap.getLeaderboardStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...leaderboardStoragePort.getLeaderboard({ queryParams }),
      options,
    })
  );
}

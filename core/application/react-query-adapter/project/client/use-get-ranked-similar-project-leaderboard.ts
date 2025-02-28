import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { GetSimilarProjectsLeaderboardModel } from "@/core/domain/project/project-contract.types";

export function useGetRankedSimilarProjectsLeaderboard({
  pathParams,
  options,
}: UseQueryFacadeParams<ProjectStoragePort["getSimilarProjectsLeaderboard"], GetSimilarProjectsLeaderboardModel>) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...projectStoragePort.getSimilarProjectsLeaderboard({ pathParams }),
      options,
    })
  );
}

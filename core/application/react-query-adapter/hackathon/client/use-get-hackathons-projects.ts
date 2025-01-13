import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetHackathonProjectsV2Model } from "@/core/domain/hackathon/hackathon-contract.types";
import { HackathonFacadePort } from "@/core/domain/hackathon/inputs/hackathon-facade-port";
import { HackathonStoragePort } from "@/core/domain/hackathon/outputs/hackathon-storage-port";

export function useGetHackathonProjects({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<HackathonFacadePort["getHackathonProjects"], GetHackathonProjectsV2Model>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<HackathonStoragePort["getHackathonProjects"], GetHackathonProjectsV2Model>({
      pathParams,
      queryParams,
      options,
      httpStorage: hackathonStoragePort.getHackathonProjects,
    })
  );
}

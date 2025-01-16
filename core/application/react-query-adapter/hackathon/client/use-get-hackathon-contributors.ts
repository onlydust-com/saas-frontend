import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetHackathonContributorsModel } from "@/core/domain/hackathon/hackathon-contract.types";
import { HackathonFacadePort } from "@/core/domain/hackathon/inputs/hackathon-facade-port";

export function useGetHackathonContributors({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<HackathonFacadePort["getHackathonContributors"], GetHackathonContributorsModel>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<HackathonFacadePort["getHackathonContributors"], GetHackathonContributorsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: hackathonStoragePort.getHackathonContributors,
    })
  );
}

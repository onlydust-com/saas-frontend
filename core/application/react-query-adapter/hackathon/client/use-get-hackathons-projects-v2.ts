import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetHackathonProjectsV2Model } from "@/core/domain/hackathon/hackathon-contract.types";
import { HackathonFacadePort } from "@/core/domain/hackathon/inputs/hackathon-facade-port";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { GetProjectsV2Model } from "@/core/domain/project/project-contract.types";

export function useGetHackathonProjectsV2({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<HackathonFacadePort["getHackathonProjects"], GetHackathonProjectsV2Model>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProjectFacadePort["getProjectsV2"], GetProjectsV2Model>({
      pathParams,
      queryParams,
      options,
      httpStorage: hackathonStoragePort.getHackathonProjects,
    })
  );
}

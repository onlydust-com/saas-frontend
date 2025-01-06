import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { HackathonFacadePort } from "@/core/domain/hackathon/inputs/hackathon-facade-port";
import { HackathonInterface } from "@/core/domain/hackathon/models/hackathon-model";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetHackathonBySlug({
  pathParams,
  options,
}: UseQueryFacadeParams<HackathonFacadePort["getHackathonBySlug"], HackathonInterface>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...hackathonStoragePort.getHackathonBySlug({ pathParams }),
      options,
    })
  );
}

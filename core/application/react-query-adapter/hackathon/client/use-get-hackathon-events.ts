import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { GetHackathonEventsModel } from "@/core/domain/hackathon/hackathon-contract.types";
import { HackathonFacadePort } from "@/core/domain/hackathon/inputs/hackathon-facade-port";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetHackathonEvents({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<HackathonFacadePort["getHackathonEvents"], GetHackathonEventsModel>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useQuery(
    useQueryAdapter({ ...hackathonStoragePort.getHackathonEvents({ pathParams, queryParams }), options })
  );
}

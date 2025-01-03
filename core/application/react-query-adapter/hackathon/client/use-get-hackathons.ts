import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { GetHackathonsModel } from "@/core/domain/hackathon/hackathon-contract.types";
import { HackathonFacadePort } from "@/core/domain/hackathon/inputs/hackathon-facade-port";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetHackathons({
  options,
}: UseQueryFacadeParams<HackathonFacadePort["getHackathons"], GetHackathonsModel>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useQuery(useQueryAdapter({ ...hackathonStoragePort.getHackathons({}), options }));
}

import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { GetEcosystemEventsModel } from "@/core/domain/ecosystem/ecosystem-contract.types";
import { EcosystemFacadePort } from "@/core/domain/ecosystem/input/ecosystem-facade-port";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetEcosystemEvents({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<EcosystemFacadePort["getEcosystemEvents"], GetEcosystemEventsModel>) {
  const ecosystemStoragePort = bootstrap.getEcosystemStoragePortForClient();

  return useQuery(
    useQueryAdapter({ ...ecosystemStoragePort.getEcosystemEvents({ pathParams, queryParams }), options })
  );
}

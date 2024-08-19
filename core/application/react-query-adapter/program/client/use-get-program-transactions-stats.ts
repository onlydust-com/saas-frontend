import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { GetProgramTransactionsStatsResponse } from "@/core/domain/program/program-contract.types";

export function useGetProgramTransactionsStats({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<ProgramFacadePort["getProgramTransactionsStats"], GetProgramTransactionsStatsResponse>) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useQuery(
    useQueryAdapter({ ...programStoragePort.getProgramTransactionsStats({ pathParams, queryParams }), options })
  );
}

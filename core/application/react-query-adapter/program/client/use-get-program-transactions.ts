import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { GetProgramTransactionsModel } from "@/core/domain/program/program-contract.types";

export function useGetProgramsTransactions({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProgramFacadePort["getProgramTransactions"], GetProgramTransactionsModel>) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProgramFacadePort["getProgramTransactions"], GetProgramTransactionsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: programStoragePort.getProgramTransactions,
    })
  );
}

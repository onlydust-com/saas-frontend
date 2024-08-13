import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetTransactionsModel } from "@/core/domain/program/program-contract.types";
import { TransactionFacadePort } from "@/core/domain/transaction/input/transaction-facade-port";

export function useGetProgramsByIdTransactions({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<TransactionFacadePort["getTransactions"], GetTransactionsModel>) {
  const transactionStoragePort = bootstrap.getProgramStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<TransactionFacadePort["getTransactions"], GetTransactionsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: transactionStoragePort.getProgramTransactions,
    })
  );
}

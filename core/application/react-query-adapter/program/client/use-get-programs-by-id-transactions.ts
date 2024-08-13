import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { TransactionFacadePort } from "@/core/domain/transaction/input/transaction-facade-port";
import { GetTransactionsModel } from "@/core/domain/transaction/transaction-contract.types";

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
      httpStorage: transactionStoragePort.getProgramByIdTransactions,
    })
  );
}

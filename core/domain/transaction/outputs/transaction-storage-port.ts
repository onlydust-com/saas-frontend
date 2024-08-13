import {
  GetTransactionsPortParams,
  GetTransactionsPortResponse,
} from "@/core/domain/transaction/transaction-contract.types";

export interface TransactionStoragePort {
  routes: Record<string, string>;
  getTransactions(p: GetTransactionsPortParams): GetTransactionsPortResponse;
}

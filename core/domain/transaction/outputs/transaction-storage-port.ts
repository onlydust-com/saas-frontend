import {
  GetTransactionPortParams,
  GetTransactionPortResponse,
} from "@/core/domain/transaction/transaction-contract.types";

export interface TransactionStoragePort {
  routes: Record<string, string>;
  getTransaction(p: GetTransactionPortParams): GetTransactionPortResponse;
}

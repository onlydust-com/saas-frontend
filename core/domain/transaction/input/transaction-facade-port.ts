import {
  GetTransactionsPortParams,
  GetTransactionsPortResponse,
} from "@/core/domain/transaction/transaction-contract.types";

export interface TransactionFacadePort {
  getTransactions(p: GetTransactionsPortParams): GetTransactionsPortResponse;
}

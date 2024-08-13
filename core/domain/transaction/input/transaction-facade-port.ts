import {
  GetTransactionPortParams,
  GetTransactionPortResponse,
} from "@/core/domain/transaction/transaction-contract.types";

export interface TransactionFacadePort {
  getTransaction(p: GetTransactionPortParams): GetTransactionPortResponse;
}

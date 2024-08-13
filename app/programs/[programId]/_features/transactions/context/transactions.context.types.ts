import { PropsWithChildren } from "react";

import { GetTransactionsPortParams } from "@/core/domain/program/program-contract.types";

export interface TransactionsContextProps extends PropsWithChildren {
  programId: string;
}

export type TransactionsContextQueryParams = GetTransactionsPortParams["queryParams"];

export interface TransactionsContextReturn {
  programId: string;
  transactionStats?: any;
  queryParams: TransactionsContextQueryParams;
  filters: {
    values: TransactionsContextFilter;
    isCleared: boolean;
    set: (filter: Partial<TransactionsContextFilter>) => void;
    clear: () => void;
    count: number;
    options: TransactionsContextFiltersOptions;
  };
}

export type TransactionContextFilterStatus = "granted" | "received" | "returned";

export interface TransactionsContextFilter {
  search: string;
  status: TransactionContextFilterStatus[];
}

export interface TransactionsContextFiltersOptions {
  status: TransactionContextFilterStatus[];
}

export const DEFAULT_FILTER: TransactionsContextFilter = {
  search: "",
  status: ["granted", "received", "returned"],
};

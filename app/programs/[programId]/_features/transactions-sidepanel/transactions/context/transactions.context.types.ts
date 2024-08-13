import { PropsWithChildren } from "react";

import {
  GetProgramTransactionsPortParams,
  GetProgramTransactionsStatsResponse,
} from "@/core/domain/program/program-contract.types";

export interface TransactionsContextProps extends PropsWithChildren {
  programId: string;
}

type TransactionsStats = GetProgramTransactionsStatsResponse["stats"];
export type TransactionsContextQueryParams = GetProgramTransactionsPortParams["queryParams"];

export interface TransactionsContextReturn {
  programId: string;
  transactionsStats?: TransactionsStats;
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

export type TransactionContextFilterTypes = "GRANTED" | "RECEIVED" | "RETURNED";

export interface TransactionsContextFilter {
  search: string;
  types: TransactionContextFilterTypes[];
}

export interface TransactionsContextFiltersOptions {
  types: TransactionContextFilterTypes[];
}

export const DEFAULT_FILTER: TransactionsContextFilter = {
  search: "",
  types: ["GRANTED", "RECEIVED", "RETURNED"],
};

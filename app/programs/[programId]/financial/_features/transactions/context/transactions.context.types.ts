import { PropsWithChildren } from "react";

import { GetBiStatsFinancialsPortParams, GetBiStatsFinancialsResponse } from "@/core/domain/bi/bi-contract.types";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

import { SortDirection } from "@/shared/features/transactions/transactions-filters/transactions-filters.types";

export interface TransactionsContextProps extends PropsWithChildren {
  programId: string;
}

export type TransactionsContextQueryParams = GetBiStatsFinancialsPortParams["queryParams"];

export interface TransactionsContextReturn {
  programId: string;
  monthlyTransactions?: GetBiStatsFinancialsResponse;
  isLoadingTransactions?: boolean;
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

export enum TransactionsContextFilterType {
  GRANTED = "GRANTED",
  UNGRANTED = "UNGRANTED",
  ALLOCATED = "ALLOCATED",
  UNALLOCATED = "UNALLOCATED",
}

export type TransactionsContextFilterTypes = `${TransactionsContextFilterType}`;

export interface TransactionsContextFilter {
  search: string;
  types: TransactionsContextFilterTypes[];
  sortDirection: SortDirection;
  dateRange?: DateRangePickerValue;
}

export interface TransactionsContextFiltersOptions {
  types: TransactionsContextFilterTypes[];
}

export const DEFAULT_FILTER: TransactionsContextFilter = {
  search: "",
  types: [],
  sortDirection: SortDirection.DESC,
  dateRange: undefined,
};

import { PropsWithChildren } from "react";

import { GetBiStatsFinancialsPortParams, GetBiStatsFinancialsResponse } from "@/core/domain/bi/bi-contract.types";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

import { SortDirection } from "@/shared/features/transactions/transactions-filters/transactions-filters.types";

export interface MyRewardsTransactionsContextProps extends PropsWithChildren {}

export type MyRewardsTransactionsContextQueryParams = GetBiStatsFinancialsPortParams["queryParams"];

export interface MyRewardsTransactionsContextReturn {
  githubUserId: number;
  monthlyTransactions?: GetBiStatsFinancialsResponse;
  queryParams: MyRewardsTransactionsContextQueryParams;
  isLoadingTransactions: boolean;
  filters: {
    values: MyRewardsTransactionsContextFilter;
    isCleared: boolean;
    set: (filter: Partial<MyRewardsTransactionsContextFilter>) => void;
    clear: () => void;
    count: number;
    options: MyRewardsTransactionsContextFiltersOptions;
  };
}

export enum MyRewardsTransactionsContextFilterType {
  REWARDED = "REWARDED",
  PAID = "PAID",
}

export type MyRewardsTransactionsContextFilterTypes = `${MyRewardsTransactionsContextFilterType}`;

export interface MyRewardsTransactionsContextFilter {
  search: string;
  types: MyRewardsTransactionsContextFilterTypes[];
  sortDirection: SortDirection;
  dateRange?: DateRangePickerValue;
}

export interface MyRewardsTransactionsContextFiltersOptions {
  types: MyRewardsTransactionsContextFilterTypes[];
}

export const DEFAULT_FILTER: MyRewardsTransactionsContextFilter = {
  search: "",
  types: [],
  sortDirection: SortDirection.DESC,
  dateRange: undefined,
};

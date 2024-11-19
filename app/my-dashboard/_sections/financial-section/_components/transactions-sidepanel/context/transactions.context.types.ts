import { PropsWithChildren } from "react";

import { GetRewardsPortParams, GetRewardsResponse } from "@/core/domain/reward/reward-contract.types";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

export interface TransactionsContextProps extends PropsWithChildren {}

type Transactions = GetRewardsResponse;
export type TransactionsContextQueryParams = GetRewardsPortParams["queryParams"];

export interface TransactionsContextReturn {
  githubUserId: number;
  transactions?: Transactions;
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
  REWARDED = "REWARDED",
  UNGRANTED = "UNGRANTED",
  UNALLOCATED = "UNALLOCATED",
}

export type TransactionsContextFilterTypes = `${TransactionsContextFilterType}`;

export interface TransactionsContextFilter {
  search: string;
  types: TransactionsContextFilterTypes[];
  dateRange?: DateRangePickerValue;
}

export interface TransactionsContextFiltersOptions {
  types: TransactionsContextFilterTypes[];
}

export const DEFAULT_FILTER: TransactionsContextFilter = {
  search: "",
  types: [],
  dateRange: undefined,
};

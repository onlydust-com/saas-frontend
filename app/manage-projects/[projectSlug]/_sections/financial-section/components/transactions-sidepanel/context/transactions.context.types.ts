import { PropsWithChildren } from "react";

import {
  GetSponsorTransactionsStatsPortParams,
  GetSponsorTransactionsStatsResponse,
} from "@/core/domain/sponsor/sponsor-contract.types";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

export interface TransactionsContextProps extends PropsWithChildren {
  projectSlug: string;
}

type TransactionsStats = GetSponsorTransactionsStatsResponse["stats"];
export type TransactionsContextQueryParams = GetSponsorTransactionsStatsPortParams["queryParams"];

export interface TransactionsContextReturn {
  projectSlug: string;
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

export enum TransactionsContextFilterType {
  DEPOSITED = "DEPOSITED",
  ALLOCATED = "ALLOCATED",
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

import { PropsWithChildren } from "react";

import { GetBiStatsFinancialsPortParams, GetBiStatsFinancialsResponse } from "@/core/domain/bi/bi-contract.types";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

import { SortDirection } from "@/shared/features/transactions/transactions-filters/transactions-filters.types";

export interface ProjectTransactionsContextProps extends PropsWithChildren {
  projectSlug: string;
}

export type ProjectTransactionsContextQueryParams = GetBiStatsFinancialsPortParams["queryParams"];

export interface ProjectTransactionsContextReturn {
  projectSlug: string;
  monthlyTransactions?: GetBiStatsFinancialsResponse;
  queryParams: ProjectTransactionsContextQueryParams;
  isLoadingTransactions: boolean;
  filters: {
    values: ProjectTransactionsContextFilter;
    isCleared: boolean;
    set: (filter: Partial<ProjectTransactionsContextFilter>) => void;
    clear: () => void;
    count: number;
    options: ProjectTransactionsContextFiltersOptions;
  };
}

export enum ProjectTransactionsContextFilterType {
  GRANTED = "GRANTED",
  REWARDED = "REWARDED",
  UNGRANTED = "UNGRANTED",
  UNALLOCATED = "UNALLOCATED",
}

export type ProjectTransactionsContextFilterTypes = `${ProjectTransactionsContextFilterType}`;

export interface ProjectTransactionsContextFilter {
  search: string;
  types: ProjectTransactionsContextFilterTypes[];
  sortDirection: SortDirection;
  dateRange?: DateRangePickerValue;
}

export interface ProjectTransactionsContextFiltersOptions {
  types: ProjectTransactionsContextFilterTypes[];
}

export const DEFAULT_FILTER: ProjectTransactionsContextFilter = {
  search: "",
  types: [],
  sortDirection: SortDirection.DESC,
  dateRange: undefined,
};

export interface ProjectTransactionsSidepanelProps {
  projectSlug: string;
}

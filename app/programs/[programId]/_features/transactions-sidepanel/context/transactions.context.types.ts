import { PropsWithChildren } from "react";

import {
  GetProgramTransactionsPortParams,
  GetProgramTransactionsStatsResponse,
} from "@/core/domain/program/program-contract.types";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

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

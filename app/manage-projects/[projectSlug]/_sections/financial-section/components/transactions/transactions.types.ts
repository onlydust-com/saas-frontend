import { GetBiStatsFinancialsPortParams } from "@/core/domain/bi/bi-contract.types";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

export type TransactionsQueryParams = GetBiStatsFinancialsPortParams["queryParams"];

export enum TransactionsFilterType {
  GRANTED = "GRANTED",
  REWARDED = "REWARDED",
  UNGRANTED = "UNGRANTED",
  UNALLOCATED = "UNALLOCATED",
}

export type TransactionsFilterTypes = `${TransactionsFilterType}`;

export interface TransactionsFilter {
  search: string;
  types: TransactionsFilterTypes[];
  dateRange?: DateRangePickerValue;
}

export interface TransactionsFiltersOptions {
  types: TransactionsFilterTypes[];
}

export const DEFAULT_FILTER: TransactionsFilter = {
  search: "",
  types: [],
  dateRange: undefined,
};

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { bootstrap } from "@/core/bootstrap";

import {
  DEFAULT_FILTER,
  TransactionsContextFilter,
  TransactionsContextFilterType,
  TransactionsContextFiltersOptions,
  TransactionsContextProps,
  TransactionsContextQueryParams,
  TransactionsContextReturn,
} from "./transactions.context.types";

export const TransactionsContext = createContext<TransactionsContextReturn>({
  sponsorId: "",
  transactionsStats: [],
  queryParams: {},
  filters: {
    values: DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    count: 0,
    options: {
      types: [],
    },
  },
});

export function TransactionsContextProvider({ children, sponsorId }: TransactionsContextProps) {
  const [filters, setFilters] = useState<TransactionsContextFilter>(DEFAULT_FILTER);
  const [filtersOptions] = useState<TransactionsContextFiltersOptions>({
    types: [
      TransactionsContextFilterType.DEPOSITED,
      TransactionsContextFilterType.ALLOCATED,
      TransactionsContextFilterType.UNALLOCATED,
    ],
  });
  const [queryParams, setQueryParams] = useState<TransactionsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<TransactionsContextQueryParams>(queryParams);

  const dateKernelPort = bootstrap.getDateKernelPort();

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  const { data: transactionsStats } = SponsorReactQueryAdapter.client.useGetSponsorTransactionsStats({
    pathParams: { sponsorId },
    queryParams: debouncedQueryParams,
    options: {
      enabled: !!sponsorId,
    },
  });

  useEffect(() => {
    setQueryParams({
      search: filters.search || undefined,
      types: filters.types.length ? filters.types : undefined,
      fromDate: filters.dateRange?.start ? dateKernelPort.format(filters.dateRange.start, "yyyy-MM-dd") : undefined,
      toDate: filters.dateRange?.end ? dateKernelPort.format(filters.dateRange.end, "yyyy-MM-dd") : undefined,
    });
  }, [dateKernelPort, filters]);

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.types.length + (filters.dateRange ? 1 : 0);
  }, [filters]);

  const setFilter = (filter: Partial<TransactionsContextFilter>) => {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTER);
  };

  return (
    <TransactionsContext.Provider
      value={{
        sponsorId,
        transactionsStats: transactionsStats?.stats,
        queryParams: debouncedQueryParams,
        filters: {
          values: filters,
          isCleared,
          set: setFilter,
          clear: clearFilters,
          count: filtersCount,
          options: filtersOptions,
        },
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("TransactionsContext must be used inside a TransactionsContextProvider");
  }

  return context;
}

import { keepPreviousData } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import {
  DEFAULT_FILTER,
  TransactionsContextFilter,
  TransactionsContextFilterType,
  TransactionsContextFiltersOptions,
  TransactionsContextProps,
  TransactionsContextQueryParams,
  TransactionsContextReturn,
} from "./transactions.context.types";

// TODO: @NeoxAzrot add range date picker
export const TransactionsContext = createContext<TransactionsContextReturn>({
  programId: "",
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

export function TransactionsContextProvider({ children, programId }: TransactionsContextProps) {
  const [filters, setFilters] = useState<TransactionsContextFilter>(DEFAULT_FILTER);
  const [filtersOptions] = useState<TransactionsContextFiltersOptions>({
    types: [
      TransactionsContextFilterType.GRANTED,
      TransactionsContextFilterType.RECEIVED,
      TransactionsContextFilterType.RETURNED,
    ],
  });
  const [queryParams, setQueryParams] = useState<TransactionsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<TransactionsContextQueryParams>(queryParams);

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  const { data: transactionsStats } = ProgramReactQueryAdapter.client.useGetProgramTransactionsStats({
    pathParams: { programId },
    queryParams: debouncedQueryParams,
    options: {
      placeholderData: keepPreviousData,
      enabled: !!programId,
    },
  });

  useEffect(() => {
    setQueryParams({
      search: filters.search || undefined,
      types: filters.types.length ? filters.types : undefined,
    });
  }, [filters]);

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.types.length;
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
        programId,
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

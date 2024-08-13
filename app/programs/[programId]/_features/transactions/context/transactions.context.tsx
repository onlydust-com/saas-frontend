import { keepPreviousData } from "@tanstack/react-query";
import { HackathonReactQueryAdapter } from "core/application/react-query-adapter/hackathon";
import { createContext, useEffect, useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import {
  DEFAULT_FILTER,
  TransactionsContextFilter,
  TransactionsContextFiltersOptions,
  TransactionsContextProps,
  TransactionsContextQueryParams,
  TransactionsContextReturn,
} from "./transactions.context.types";

// TODO: @NeoxAzrot add range date picker
export const TransactionsContext = createContext<TransactionsContextReturn>({
  programId: "",
  transactionStats: [],
  queryParams: {},
  filters: {
    values: DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    count: 0,
    options: {
      status: [],
    },
  },
});

export function TransactionsContextProvider({ children, programId }: TransactionsContextProps) {
  const [filters, setFilters] = useState<TransactionsContextFilter>(DEFAULT_FILTER);
  const [filtersOptions] = useState<TransactionsContextFiltersOptions>({
    status: ["granted", "received", "returned"],
  });
  const [queryParams, setQueryParams] = useState<TransactionsContextQueryParams>({});
  const [debouncedQueryParams] = useDebounceValue(queryParams, 300);

  const { data: projectIssues } = HackathonReactQueryAdapter.client.useGetHackathonByIdProjectIssues({
    pathParams: { programId },
    queryParams: debouncedQueryParams,
    options: {
      placeholderData: keepPreviousData,
    },
  });

  useEffect(() => {
    setQueryParams({
      search: filters.search || undefined,
      types: filters.status.length ? filters.status : undefined,
    });
  }, [filters]);

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.status.length;
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
        transactionStats: projectIssues?.projects,
        queryParams,
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

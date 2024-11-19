import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

// TODO: change it with financials
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
  githubUserId: 0,
  transactions: undefined,
  queryParams: {
    pageIndex: 0,
    pageSize: 100,
  },
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

export function TransactionsContextProvider({ children }: TransactionsContextProps) {
  const [filters, setFilters] = useState<TransactionsContextFilter>(DEFAULT_FILTER);
  const [filtersOptions] = useState<TransactionsContextFiltersOptions>({
    types: [
      TransactionsContextFilterType.GRANTED,
      TransactionsContextFilterType.REWARDED,
      TransactionsContextFilterType.UNGRANTED,
      TransactionsContextFilterType.UNALLOCATED,
    ],
  });
  const [queryParams, setQueryParams] = useState<TransactionsContextQueryParams>({
    pageIndex: 0,
    pageSize: 100,
    recipientIds: [],
  });
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<TransactionsContextQueryParams>(queryParams);

  const { githubUserId } = useAuthUser();

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  const { data: transactions } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams: {
      ...debouncedQueryParams,
      recipientIds: [githubUserId || 0],
    },
  });

  useEffect(() => {
    setQueryParams({
      pageIndex: 0,
      pageSize: 100,
      recipientIds: [githubUserId || 0],
      search: filters.search || undefined,
    });
  }, [filters, githubUserId]);

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
        githubUserId: githubUserId || 0,
        transactions: transactions?.pages || [],
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

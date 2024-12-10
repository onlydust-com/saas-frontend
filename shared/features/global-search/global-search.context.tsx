"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { SearchReactQueryAdapter } from "@/core/application/react-query-adapter/search";
import { SearchItemInterface } from "@/core/domain/search/models/search-item-model";

interface Filters {
  type?: "project" | "contributor";
  languages?: string[];
  ecosystems?: string[];
  categories?: string[];
}

interface GlobalSearchContextInterface {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  inputValue: string | null;
  onInputChange: (value: string) => void;
  suggestion?: string;
  isOpenFilter: boolean;
  onOpenFilterChange: (value: boolean) => void;
  onClearAllFilters: () => void;
  filters: Filters;
  onFiltersChange: (value: Filters) => void;
  onFiltersTypeChange: (value: "project" | "contributor") => void;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  results: SearchItemInterface[];
}

export const GlobalSearchContext = createContext<GlobalSearchContextInterface>({
  isOpen: false,
  onOpenChange: () => {},
  inputValue: "",
  onInputChange: () => {},
  suggestion: "",
  isOpenFilter: false,
  onOpenFilterChange: () => {},
  onClearAllFilters: () => {},
  filters: {},
  onFiltersChange: () => {},
  onFiltersTypeChange: () => {},
  hasNextPage: false,
  fetchNextPage: () => {},
  isFetchingNextPage: false,
  results: [],
});

export function GlobalSearchProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = SearchReactQueryAdapter.client.useSearch({
    queryParams: {
      keyword: inputValue ?? undefined,
      languages: filters.languages,
      ecosystems: filters.ecosystems,
      categories: filters.categories,
    },
    options: {
      enabled: open,
    },
  });

  const { data: Suggestion } = SearchReactQueryAdapter.client.useSuggest({
    queryParams: {
      keyword: inputValue ?? "",
      languages: filters.languages,
      ecosystems: filters.ecosystems,
      categories: filters.categories,
      pageSize: 1,
      pageIndex: 0,
    },
    options: {
      enabled: open,
    },
  });

  function onOpenChange(v: boolean) {
    setOpen(v);
  }

  function onInputChange(v: string) {
    setInputValue(v);
  }

  function onOpenFilterChange(v: boolean) {
    setOpenFilter(v);
  }

  function onClearAllFilters() {
    setFilters({});
    setOpenFilter(false);
  }

  function onFiltersChange(value: Filters) {
    setFilters(value);
  }

  function onFiltersTypeChange(value?: "project" | "contributor") {
    if (value) {
      setFilters({ type: value });
    } else {
      setFilters({});
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <GlobalSearchContext.Provider
      value={{
        isOpen: open,
        onOpenChange,
        inputValue,
        onInputChange,
        suggestion: Suggestion?.value,
        isOpenFilter: openFilter,
        onOpenFilterChange,
        onClearAllFilters,
        filters,
        onFiltersChange,
        onFiltersTypeChange,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        results: data?.pages.flatMap(page => page.results) ?? [],
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
}

export function useGlobalSearch() {
  return useContext(GlobalSearchContext);
}

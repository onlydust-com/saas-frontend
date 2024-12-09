"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { SearchReactQueryAdapter } from "@/core/application/react-query-adapter/search";

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
});

export function GlobalSearchProvider({ children }: PropsWithChildren) {
  const suggestion = "Kakarot";
  // const suggestion = "";
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>("Kak");
  const [filters, setFilters] = useState<Filters>({});
  // const [inputValue, setInputValue] = useState<string | null>(null);

  const { data } = SearchReactQueryAdapter.client.useSearch({
    queryParams: {
      keyword: inputValue ?? undefined,
    },
  });

  console.log("data", data);

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
        suggestion,
        isOpenFilter: openFilter,
        onOpenFilterChange,
        onClearAllFilters,
        filters,
        onFiltersChange,
        onFiltersTypeChange,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
}

export function useGlobalSearch() {
  return useContext(GlobalSearchContext);
}

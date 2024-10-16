"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { AnyType } from "@/core/kernel/types";

import { FilterDataContextInterface, FilterDataProviderProps } from "./filter-data.types";

export const FilterDataContext = createContext<FilterDataContextInterface<AnyType>>({
  filters: {},
  setFilters: () => {},
  saveFilters: () => {},
  resetFilters: () => {},
});

export function FilterDataProvider<F extends object>({ children, filters, setFilters }: FilterDataProviderProps<F>) {
  const [localFilters, setLocalFilters] = useState<F>(filters);

  function sanitizeFilters(filters: F) {
    return Object.fromEntries(
      Object.entries(filters).filter(([, value]) => {
        if (value === null || typeof value === "undefined") return false;

        // Handles arrays and object literals
        if (typeof value === "object" && Object.keys(value).length === 0) return false;

        if (typeof value === "string" && value.trim() === "") return false;

        return true;
      })
    ) as F;
  }

  function handleUpdateFilters(newFilters: F) {
    setLocalFilters(
      sanitizeFilters({
        ...localFilters,
        ...newFilters,
      })
    );
  }

  function handleSave() {
    setFilters(localFilters);
  }

  function handleReset() {
    setLocalFilters({} as F);
    setFilters({} as F);
  }

  useEffect(() => {
    setLocalFilters(sanitizeFilters(filters));
  }, [filters]);

  return (
    <FilterDataContext.Provider
      value={{
        filters: localFilters,
        setFilters: handleUpdateFilters,
        saveFilters: handleSave,
        resetFilters: handleReset,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
}

export function useFilterData<F extends object>() {
  const context = useContext<FilterDataContextInterface<F>>(FilterDataContext);

  if (context === undefined) {
    throw new Error("useFilterData must be used within an FilterDataProvider");
  }

  return context;
}

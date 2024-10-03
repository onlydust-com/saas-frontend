"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { ContributorsTableFilters } from "@/app/data/deep-dive/_features/contributors-table/contributors-table";

interface FilterDataContextInterface {
  // TODO @Mehdi update to ContributionFiltersType once ready
  filters: ContributorsTableFilters;
  setFilters: (filters: ContributorsTableFilters) => void;
  saveFilters: () => void;
  resetFilters: () => void;
}

interface FilterDataProviderProps extends PropsWithChildren {
  filters: ContributorsTableFilters;
  setFilters: (filters: ContributorsTableFilters) => void;
}

export const FilterDataContext = createContext<FilterDataContextInterface>({
  filters: {},
  setFilters: () => {},
  saveFilters: () => {},
  resetFilters: () => {},
});

export function FilterDataProvider({ children, filters, setFilters }: FilterDataProviderProps) {
  const [localFilters, setLocalFilters] = useState<ContributorsTableFilters>(filters);
  function handleUpdateFilters(newFilters: ContributorsTableFilters) {
    setLocalFilters({
      ...localFilters,
      ...newFilters,
    });
  }

  function handleSave() {
    setFilters(localFilters);
  }

  function handleReset() {
    setLocalFilters({});
    setFilters({});
  }

  useEffect(() => {
    setLocalFilters(filters);
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

export function useFilterData() {
  return useContext(FilterDataContext);
}

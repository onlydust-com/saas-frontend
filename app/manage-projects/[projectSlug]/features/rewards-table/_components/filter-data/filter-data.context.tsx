"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { RewardsTableFilters } from "@/app/manage-projects/[projectSlug]/features/rewards-table/rewards-table";

interface FilterDataContextInterface {
  filters: RewardsTableFilters;
  setFilters: (filters: RewardsTableFilters) => void;
  saveFilters: () => void;
  resetFilters: () => void;
}

interface FilterDataProviderProps extends PropsWithChildren {
  filters: RewardsTableFilters;
  setFilters: (filters: RewardsTableFilters) => void;
}

export const FilterDataContext = createContext<FilterDataContextInterface>({
  filters: {},
  setFilters: () => {},
  saveFilters: () => {},
  resetFilters: () => {},
});

export function FilterDataProvider({ children, filters, setFilters }: FilterDataProviderProps) {
  const [localFilters, setLocalFilters] = useState<RewardsTableFilters>(filters);
  function handleUpdateFilters(newFilters: RewardsTableFilters) {
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

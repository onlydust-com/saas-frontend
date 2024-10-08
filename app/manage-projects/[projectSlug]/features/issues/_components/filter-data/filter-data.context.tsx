"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { ContributionKanbanFilters } from "@/app/manage-projects/[projectSlug]/features/issues/issues";

interface FilterDataContextInterface {
  filters: ContributionKanbanFilters;
  setFilters: (filters: ContributionKanbanFilters) => void;
  saveFilters: () => void;
  resetFilters: () => void;
}

interface FilterDataProviderProps extends PropsWithChildren {
  filters: ContributionKanbanFilters;
  setFilters: (filters: ContributionKanbanFilters) => void;
}

export const FilterDataContext = createContext<FilterDataContextInterface>({
  filters: {},
  setFilters: () => {},
  saveFilters: () => {},
  resetFilters: () => {},
});

export function FilterDataProvider({ children, filters, setFilters }: FilterDataProviderProps) {
  const [localFilters, setLocalFilters] = useState<ContributionKanbanFilters>(filters);
  function handleUpdateFilters(newFilters: ContributionKanbanFilters) {
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

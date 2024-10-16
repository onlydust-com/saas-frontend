"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { SelectableContributorsFilters } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/selectable-contributors-accordion";

interface FilterDataContextInterface {
  filters: SelectableContributorsFilters;
  setFilters: (filters: SelectableContributorsFilters) => void;
  saveFilters: () => void;
  resetFilters: () => void;
}

interface FilterDataProviderProps extends PropsWithChildren {
  filters: SelectableContributorsFilters;
  setFilters: (filters: SelectableContributorsFilters) => void;
}

export const FilterDataContext = createContext<FilterDataContextInterface>({
  filters: {},
  setFilters: () => {},
  saveFilters: () => {},
  resetFilters: () => {},
});

export function FilterDataProvider({ children, filters, setFilters }: FilterDataProviderProps) {
  const [localFilters, setLocalFilters] = useState<SelectableContributorsFilters>(filters);
  function handleUpdateFilters(newFilters: SelectableContributorsFilters) {
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

"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { UserContributionsFilters } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";

interface FilterDataContextInterface {
  filters: UserContributionsFilters;
  setFilters: (filters: UserContributionsFilters) => void;
  saveFilters: () => void;
  resetFilters: () => void;
}

interface FilterDataProviderProps extends PropsWithChildren {
  filters: UserContributionsFilters;
  setFilters: (filters: UserContributionsFilters) => void;
}

export const FilterDataContext = createContext<FilterDataContextInterface>({
  filters: {},
  setFilters: () => {},
  saveFilters: () => {},
  resetFilters: () => {},
});

export function FilterDataProvider({ children, filters, setFilters }: FilterDataProviderProps) {
  const [localFilters, setLocalFilters] = useState<UserContributionsFilters>(filters);
  function handleUpdateFilters(newFilters: UserContributionsFilters) {
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

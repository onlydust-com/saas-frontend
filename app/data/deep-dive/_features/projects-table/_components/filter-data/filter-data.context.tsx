"use client";

import { PropsWithChildren, createContext, useContext } from "react";

import { ProjectTableFilters } from "@/app/data/deep-dive/_features/projects-table/projects-table";

interface FilterDataContextInterface {
  filters: ProjectTableFilters;
  setFilters: (filters: ProjectTableFilters) => void;
}

interface FilterDataProviderProps extends PropsWithChildren {
  filters: ProjectTableFilters;
  setFilters: (filters: ProjectTableFilters) => void;
}

export const FilterDataContext = createContext<FilterDataContextInterface>({
  filters: {},
  setFilters: () => {},
});

export function FilterDataProvider({ children, filters, setFilters }: FilterDataProviderProps) {
  function handleUpdateFilters(newFilters: ProjectTableFilters) {
    setFilters({
      ...filters,
      ...newFilters,
    });
  }

  return (
    <FilterDataContext.Provider value={{ filters, setFilters: handleUpdateFilters }}>
      {children}
    </FilterDataContext.Provider>
  );
}

export function useFilterData() {
  return useContext(FilterDataContext);
}

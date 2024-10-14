"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { ApplicantsTableFilters } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/applicants-table";

interface FilterDataContextInterface {
  filters: ApplicantsTableFilters;
  setFilters: (filters: ApplicantsTableFilters) => void;
  saveFilters: () => void;
  resetFilters: () => void;
}

interface FilterDataProviderProps extends PropsWithChildren {
  filters: ApplicantsTableFilters;
  setFilters: (filters: ApplicantsTableFilters) => void;
}

export const FilterDataContext = createContext<FilterDataContextInterface>({
  filters: {},
  setFilters: () => {},
  saveFilters: () => {},
  resetFilters: () => {},
});

export function FilterDataProvider({ children, filters, setFilters }: FilterDataProviderProps) {
  const [localFilters, setLocalFilters] = useState<ApplicantsTableFilters>(filters);
  function handleUpdateFilters(newFilters: ApplicantsTableFilters) {
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

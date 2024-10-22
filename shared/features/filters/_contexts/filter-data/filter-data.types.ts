import { PropsWithChildren } from "react";

export interface FilterDataContextInterface<F extends object> {
  filters: F;
  filterCount: number;
  setFilters: (filters: F) => void;
  saveFilters: () => void;
  resetFilters: () => void;
}

export interface FilterDataProviderProps<F extends object> extends PropsWithChildren {
  filters: F;
  setFilters: (filters: F) => void;
}

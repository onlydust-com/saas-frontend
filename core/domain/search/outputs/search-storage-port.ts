import { SearchPortParams, SearchPortResponse } from "../search-contract.types";

export interface SearchStoragePort {
  routes: Record<string, string>;
  search(p: SearchPortParams): SearchPortResponse;
}

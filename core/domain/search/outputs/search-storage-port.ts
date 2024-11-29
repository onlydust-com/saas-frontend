import { SearchPortParams, SearchPortResponse } from "@/core/domain/search/search-contract.types";

export interface SearchStoragePort {
  routes: Record<string, string>;
  search(p: SearchPortParams): SearchPortResponse;
}

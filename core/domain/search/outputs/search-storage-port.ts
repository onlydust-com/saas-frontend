import { SearchPortParams, SearchPortResponse, SuggestPortParams, SuggestPortResponse } from "../search-contract.types";

export interface SearchStoragePort {
  routes: Record<string, string>;
  search(p: SearchPortParams): SearchPortResponse;
  suggest(p: SuggestPortParams): SuggestPortResponse;
}

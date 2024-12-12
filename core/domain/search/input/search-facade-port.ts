import { SearchPortParams, SearchPortResponse, SuggestPortParams, SuggestPortResponse } from "../search-contract.types";

export interface SearchFacadePort {
  search(p: SearchPortParams): SearchPortResponse;
  suggest(p: SuggestPortParams): SuggestPortResponse;
}

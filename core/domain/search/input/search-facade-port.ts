import { SearchPortParams, SearchPortResponse } from "../search-contract.types";

export interface SearchFacadePort {
  search(p: SearchPortParams): SearchPortResponse;
}

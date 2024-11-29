import { SearchPortParams, SearchPortResponse } from "@/core/domain/search/search-contract.types";

export interface SearchFacadePort {
  search(p: SearchPortParams): SearchPortResponse;
}

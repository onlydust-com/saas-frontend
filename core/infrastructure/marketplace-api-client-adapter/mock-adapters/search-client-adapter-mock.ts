import { SearchStoragePort } from "@/core/domain/search/outputs/search-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class SearchClientAdapterMock implements SearchStoragePort {
  constructor() {}

  routes = {};

  search = mockHttpStorageResponse<SearchStoragePort["search"]>;

  suggest = mockHttpStorageResponse<SearchStoragePort["suggest"]>;
}

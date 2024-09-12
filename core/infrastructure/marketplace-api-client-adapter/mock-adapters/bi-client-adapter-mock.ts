import { BiStoragePort } from "@/core/domain/bi/outputs/bi-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class BiClientAdapterMock implements BiStoragePort {
  constructor() {}

  routes = {};

  getBiContributorsStats = mockHttpStorageResponse<BiStoragePort["getBiContributorsStats"]>;
}

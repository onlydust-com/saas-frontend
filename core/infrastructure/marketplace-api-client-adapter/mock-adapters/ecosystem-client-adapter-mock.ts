import { EcosystemStoragePort } from "@/core/domain/ecosystem/outputs/ecosystem-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class EcosystemClientAdapterMock implements EcosystemStoragePort {
  constructor() {}

  routes = {};

  searchEcosystems = mockHttpStorageResponse<EcosystemStoragePort["searchEcosystems"]>;
}

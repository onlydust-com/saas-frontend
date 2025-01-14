import { EcosystemStoragePort } from "@/core/domain/ecosystem/outputs/ecosystem-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class EcosystemClientAdapterMock implements EcosystemStoragePort {
  constructor() {}

  routes = {};

  searchEcosystems = mockHttpStorageResponse<EcosystemStoragePort["searchEcosystems"]>;

  getEcosystems = mockHttpStorageResponse<EcosystemStoragePort["getEcosystems"]>;

  getEcosystemBySlug = mockHttpStorageResponse<EcosystemStoragePort["getEcosystemBySlug"]>;

  getEcosystemContributors = mockHttpStorageResponse<EcosystemStoragePort["getEcosystemContributors"]>;
}

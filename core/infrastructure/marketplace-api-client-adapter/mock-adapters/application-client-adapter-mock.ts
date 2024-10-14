import { ApplicationStoragePort } from "@/core/domain/application/outputs/application-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ApplicationClientAdapterMock implements ApplicationStoragePort {
  constructor() {}

  routes = {};

  patchApplication = mockHttpStorageResponse<ApplicationStoragePort["patchApplication"]>;
}

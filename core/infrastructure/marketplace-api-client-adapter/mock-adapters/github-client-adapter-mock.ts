import { GithubStoragePort } from "@/core/domain/github/outputs/github-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class GithubClientAdapterMock implements GithubStoragePort {
  constructor() {}

  routes = {};

  getMyOrganizations = mockHttpStorageResponse<GithubStoragePort["getMyOrganizations"]>;
}

import { ContributionStoragePort } from "@/core/domain/contribution/output/contribution-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ContributionClientAdapterMock implements ContributionStoragePort {
  constructor() {}

  routes = {};

  getContributions = mockHttpStorageResponse<ContributionStoragePort["getContributions"]>;

  getContributionsById = mockHttpStorageResponse<ContributionStoragePort["getContributionsById"]>;

  getContributionEvent = mockHttpStorageResponse<ContributionStoragePort["getContributionEvent"]>;
}

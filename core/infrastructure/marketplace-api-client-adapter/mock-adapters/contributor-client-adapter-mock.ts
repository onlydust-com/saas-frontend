import { ContributorStoragePort } from "@/core/domain/contributor/outputs/contributor-storage-port";

import { mockHttpStorageResponse } from "../http/mock-http-client/mock-http-storage-response";

export class ContributorClientAdapterMock implements ContributorStoragePort {
  constructor() {}

  routes = {};

  getContributorStats = mockHttpStorageResponse<ContributorStoragePort["getContributorStats"]>;

  getContributorRewardsDistribution = mockHttpStorageResponse<
    ContributorStoragePort["getContributorRewardsDistribution"]
  >;

  getContributorProjects = mockHttpStorageResponse<ContributorStoragePort["getContributorProjects"]>;

  getContributorLocDistribution = mockHttpStorageResponse<ContributorStoragePort["getContributorLocDistribution"]>;

  getContributorLastYearRewind = mockHttpStorageResponse<ContributorStoragePort["getContributorLastYearRewind"]>;

  getContributorContributionsOverTime = mockHttpStorageResponse<
    ContributorStoragePort["getContributorContributionsOverTime"]
  >;
}

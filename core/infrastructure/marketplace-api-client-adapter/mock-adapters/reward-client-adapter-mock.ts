import { RewardStoragePort } from "@/core/domain/reward/outputs/reward-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class RewardClientAdapterMock implements RewardStoragePort {
  constructor() {}

  routes = {};

  getRewards = mockHttpStorageResponse<RewardStoragePort["getRewards"]>;

  getRewardById = mockHttpStorageResponse<RewardStoragePort["getRewardById"]>;

  getProjectRewards = mockHttpStorageResponse<RewardStoragePort["getProjectRewards"]>;

  getProjectReward = mockHttpStorageResponse<RewardStoragePort["getProjectReward"]>;

  getProjectRewardItems = mockHttpStorageResponse<RewardStoragePort["getProjectRewardItems"]>;

  createRewards = mockHttpStorageResponse<RewardStoragePort["createRewards"]>;

  addOtherWork = mockHttpStorageResponse<RewardStoragePort["addOtherWork"]>;

  addOtherPullRequest = mockHttpStorageResponse<RewardStoragePort["addOtherPullRequest"]>;

  addOtherIssue = mockHttpStorageResponse<RewardStoragePort["addOtherIssue"]>;

  cancelProjectReward = mockHttpStorageResponse<RewardStoragePort["cancelProjectReward"]>;
}

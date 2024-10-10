import {
  GetProjectRewardPortParams,
  GetProjectRewardPortResponse,
  GetProjectRewardsPortParams,
  GetProjectRewardsPortResponse,
} from "@/core/domain/reward/reward-contract.types";

export interface RewardStoragePort {
  routes: Record<string, string>;
  getProjectRewards(p: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectReward(p: GetProjectRewardPortParams): GetProjectRewardPortResponse;
}

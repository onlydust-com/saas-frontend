import { GetProjectRewardsPortParams, GetProjectRewardsPortResponse } from "@/core/domain/reward/reward-contract.types";

export interface RewardFacadePort {
  getProjectRewards(p: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
}

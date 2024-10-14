import {
  AddOtherIssuePortParams,
  AddOtherIssuePortResponse,
  AddOtherPullRequestPortParams,
  AddOtherPullRequestPortResponse,
  AddOtherWorkPortParams,
  AddOtherWorkPortResponse,
  CreateRewardsPortParams,
  CreateRewardsPortResponse,
  GetProjectRewardItemsPortParams,
  GetProjectRewardItemsPortResponse,
  GetProjectRewardPortParams,
  GetProjectRewardPortResponse,
  GetProjectRewardsPortParams,
  GetProjectRewardsPortResponse,
} from "@/core/domain/reward/reward-contract.types";

export interface RewardFacadePort {
  getProjectRewards(p: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectReward(p: GetProjectRewardPortParams): GetProjectRewardPortResponse;
  getProjectRewardItems(p: GetProjectRewardItemsPortParams): GetProjectRewardItemsPortResponse;
  createRewards(p: CreateRewardsPortParams): CreateRewardsPortResponse;
  addOtherWork(p: AddOtherWorkPortParams): AddOtherWorkPortResponse;
  addOtherPullRequest(p: AddOtherPullRequestPortParams): AddOtherPullRequestPortResponse;
  addOtherIssue(p: AddOtherIssuePortParams): AddOtherIssuePortResponse;
}

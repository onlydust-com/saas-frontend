import {
  AddOtherIssuePortParams,
  AddOtherIssuePortResponse,
  AddOtherPullRequestPortParams,
  AddOtherPullRequestPortResponse,
  AddOtherWorkPortParams,
  AddOtherWorkPortResponse,
  CancelRewardsPortParams,
  CancelRewardsPortResponse,
  CreateRewardsPortParams,
  CreateRewardsPortResponse,
  GetProjectRewardItemsPortParams,
  GetProjectRewardItemsPortResponse,
  GetProjectRewardPortParams,
  GetProjectRewardPortResponse,
  GetProjectRewardsPortParams,
  GetProjectRewardsPortResponse,
  GetRewardByIdPortParams,
  GetRewardByIdPortResponse,
  GetRewardsPortParams,
  GetRewardsPortResponse,
} from "@/core/domain/reward/reward-contract.types";

export interface RewardStoragePort {
  routes: Record<string, string>;
  getRewards(p: GetRewardsPortParams): GetRewardsPortResponse;
  getRewardById(p: GetRewardByIdPortParams): GetRewardByIdPortResponse;
  getProjectRewards(p: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectReward(p: GetProjectRewardPortParams): GetProjectRewardPortResponse;
  getProjectRewardItems(p: GetProjectRewardItemsPortParams): GetProjectRewardItemsPortResponse;
  createRewards(p: CreateRewardsPortParams): CreateRewardsPortResponse;
  addOtherWork(p: AddOtherWorkPortParams): AddOtherWorkPortResponse;
  addOtherPullRequest(p: AddOtherPullRequestPortParams): AddOtherPullRequestPortResponse;
  addOtherIssue(p: AddOtherIssuePortParams): AddOtherIssuePortResponse;
  cancelProjectReward(p: CancelRewardsPortParams): CancelRewardsPortResponse;
}

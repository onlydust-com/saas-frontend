import { RewardItem } from "@/core/domain/reward/models/reward-item-model";
import { RewardListItem } from "@/core/domain/reward/models/reward-list-item-model";
import { Reward } from "@/core/domain/reward/models/reward-model";
import { RewardStoragePort } from "@/core/domain/reward/outputs/reward-storage-port";
import {
  GetProjectRewardItemsResponse,
  GetProjectRewardResponse,
  GetProjectRewardsResponse,
} from "@/core/domain/reward/reward-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class RewardClientAdapter implements RewardStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectRewards: "projects/:projectId/rewards",
    getProjectReward: "projects/:projectId/rewards/:rewardId",
    getProjectRewardItems: "projects/:projectId/rewards/:rewardId/reward-items",
  } as const;

  getProjectRewards = ({ queryParams, pathParams }: FirstParameter<RewardStoragePort["getProjectRewards"]>) => {
    const path = this.routes["getProjectRewards"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectRewardsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        rewards: data.rewards.map(reward => new RewardListItem(reward)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProjectReward = ({ pathParams }: FirstParameter<RewardStoragePort["getProjectReward"]>) => {
    const path = this.routes["getProjectReward"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectRewardResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Reward(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjectRewardItems = ({ queryParams, pathParams }: FirstParameter<RewardStoragePort["getProjectRewardItems"]>) => {
    const path = this.routes["getProjectRewardItems"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectRewardItemsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        rewards: data.rewardItems.map(rewardItem => new RewardItem(rewardItem)),
      };
    };

    return {
      request,
      tag,
    };
  };
}

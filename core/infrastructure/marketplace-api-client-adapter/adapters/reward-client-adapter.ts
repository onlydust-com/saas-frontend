import { RewardItem } from "@/core/domain/reward/models/reward-item-model";
import { RewardListItem } from "@/core/domain/reward/models/reward-list-item-model";
import { Reward } from "@/core/domain/reward/models/reward-model";
import { RewardStoragePort } from "@/core/domain/reward/outputs/reward-storage-port";
import {
  CreateRewardsBody,
  GetProjectRewardItemsResponse,
  GetProjectRewardResponse,
  GetProjectRewardsResponse,
} from "@/core/domain/reward/reward-contract.types";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class RewardClientAdapter implements RewardStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectRewards: "projects/:projectId/rewards",
    getProjectReward: "projects/:projectId/rewards/:rewardId",
    getProjectRewardItems: "projects/:projectId/rewards/:rewardId/reward-items",
    createRewards: "projects/:projectId/rewards",
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

  createRewards = ({ pathParams }: FirstParameter<RewardStoragePort["createRewards"]>) => {
    const path = this.routes["createRewards"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: CreateRewardsBody) =>
      this.client.request<never>({
        path,
        version: MarketplaceApiVersion.v2,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };
}

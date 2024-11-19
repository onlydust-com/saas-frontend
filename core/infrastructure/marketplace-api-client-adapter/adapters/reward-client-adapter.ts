import { RewardItem } from "@/core/domain/reward/models/reward-item-model";
import { RewardListItem } from "@/core/domain/reward/models/reward-list-item-model";
import { RewardListItemV2 } from "@/core/domain/reward/models/reward-list-item-v2-model";
import { Reward } from "@/core/domain/reward/models/reward-model";
import { RewardableItem } from "@/core/domain/reward/models/rewardable-item-model";
import { RewardStoragePort } from "@/core/domain/reward/outputs/reward-storage-port";
import {
  AddOtherIssueBody,
  AddOtherIssueResponse,
  AddOtherPullRequestBody,
  AddOtherPullRequestResponse,
  AddOtherWorkBody,
  AddOtherWorkResponse,
  CreateRewardsBody,
  CreateRewardsResponse,
  GetProjectRewardItemsResponse,
  GetProjectRewardResponse,
  GetProjectRewardsResponse,
  GetRewardByIdResponse,
  GetRewardsResponse,
} from "@/core/domain/reward/reward-contract.types";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class RewardClientAdapter implements RewardStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getRewards: "rewards",
    getRewardById: "rewards/:rewardId",
    getProjectRewards: "projects/:projectId/rewards",
    getProjectReward: "projects/:projectId/rewards/:rewardId",
    cancelProjectReward: "projects/:projectId/rewards/:rewardId",
    getProjectRewardItems: "projects/:projectId/rewards/:rewardId/reward-items",
    createRewards: "projects/:projectId/rewards",
    addOtherWork: "projects/:projectId/rewardable-items/other-works",
    addOtherPullRequest: "projects/:projectId/rewardable-items/other-pull-requests",
    addOtherIssue: "projects/:projectId/rewardable-items/other-issues",
  } as const;

  getRewards = ({ queryParams, pathParams }: FirstParameter<RewardStoragePort["getRewards"]>) => {
    const path = this.routes["getRewards"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetRewardsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        rewards: data.rewards.map(reward => new RewardListItemV2(reward)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getRewardById = ({ pathParams }: FirstParameter<RewardStoragePort["getRewardById"]>) => {
    const path = this.routes["getRewardById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetRewardByIdResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new RewardListItemV2(data);
    };

    return {
      request,
      tag,
    };
  };

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
        rewardItems: data.rewardItems.map(rewardItem => new RewardItem(rewardItem)),
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
      this.client.request<CreateRewardsResponse>({
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

  addOtherWork = ({ pathParams }: FirstParameter<RewardStoragePort["addOtherWork"]>) => {
    const path = this.routes["addOtherWork"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AddOtherWorkBody) => {
      const data = await this.client.request<AddOtherWorkResponse>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

      return new RewardableItem(data);
    };

    return {
      request,
      tag,
    };
  };

  addOtherPullRequest = ({ pathParams }: FirstParameter<RewardStoragePort["addOtherPullRequest"]>) => {
    const path = this.routes["addOtherPullRequest"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AddOtherPullRequestBody) => {
      const data = await this.client.request<AddOtherPullRequestResponse>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

      return new RewardableItem(data);
    };
    return {
      request,
      tag,
    };
  };

  addOtherIssue = ({ pathParams }: FirstParameter<RewardStoragePort["addOtherIssue"]>) => {
    const path = this.routes["addOtherIssue"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AddOtherIssueBody) => {
      const data = await this.client.request<AddOtherIssueResponse>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

      return new RewardableItem(data);
    };

    return {
      request,
      tag,
    };
  };

  cancelProjectReward = ({ pathParams }: FirstParameter<RewardStoragePort["cancelProjectReward"]>) => {
    const path = this.routes["cancelProjectReward"];
    const method = "DELETE";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () =>
      this.client.request({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };
}

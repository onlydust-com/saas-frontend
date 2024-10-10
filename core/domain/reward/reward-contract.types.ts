import { RewardItemInterface } from "@/core/domain/reward/models/reward-item-model";
import { RewardListItemInterface } from "@/core/domain/reward/models/reward-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Project Rewards ------------------------------ */
export type GetProjectRewardsResponse = components["schemas"]["RewardsPageResponse"];
export type GetProjectRewardsModel = Omit<GetProjectRewardsResponse, "rewards"> & {
  rewards: RewardListItemInterface[];
};

type GetProjectRewardsPathParams = operations["getProjectRewards"]["parameters"]["path"];
export type GetProjectRewardsQueryParams = operations["getProjectRewards"]["parameters"]["query"];

export type GetProjectRewardsPortResponse = HttpStorageResponse<GetProjectRewardsResponse>;

export type GetProjectRewardsPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardsPathParams;
  QueryParams: GetProjectRewardsQueryParams;
}>;

/* ------------------------------ Get Project Reward ------------------------------ */
export type GetProjectRewardResponse = components["schemas"]["RewardDetailsResponse"];

type GetProjectRewardPathParams = operations["getProjectRewards"]["parameters"]["path"];

export type GetProjectRewardPortResponse = HttpStorageResponse<GetProjectRewardResponse>;

export type GetProjectRewardPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardPathParams;
}>;

/* ------------------------------ Get Project Reward Items ------------------------------ */
export type GetProjectRewardItemsResponse = components["schemas"]["RewardItemsPageResponse"];
export type GetProjectRewardItemsModel = Omit<GetProjectRewardItemsResponse, "rewardItems"> & {
  rewardItems: RewardItemInterface[];
};

type GetProjectRewardItemsPathParams = operations["getProjectRewardItemsPage"]["parameters"]["path"];
type GetProjectRewardItemsQueryParams = operations["getProjectRewardItemsPage"]["parameters"]["query"];

export type GetProjectRewardItemsPortResponse = HttpStorageResponse<GetProjectRewardItemsResponse>;

export type GetProjectRewardItemsPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardItemsPathParams;
  QueryParams: GetProjectRewardItemsQueryParams;
}>;

/* ------------------------------ Create Rewards ------------------------------ */

export type CreateRewardsBody = components["schemas"]["RewardRequest"][];

type CreateRewardsPathParams = operations["createRewards"]["parameters"]["path"];

export type CreateRewardsPortParams = HttpClientParameters<{
  PathParams: CreateRewardsPathParams;
}>;

export type CreateRewardsPortResponse = HttpStorageResponse;

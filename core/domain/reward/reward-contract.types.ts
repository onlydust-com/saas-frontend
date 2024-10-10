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
type GetProjectRewardsQueryParams = operations["getProjectRewards"]["parameters"]["query"];

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

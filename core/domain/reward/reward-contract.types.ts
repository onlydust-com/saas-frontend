import { RewardListItemInterface } from "@/core/domain/reward/models/reward-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Rewards ------------------------------ */
export type GetRewardsResponse = components["schemas"]["RewardsPageResponse"];
export type GetRewardsModel = Omit<GetRewardsResponse, "rewards"> & {
  rewards: RewardListItemInterface[];
};

type GetRewardsPathParams = operations["getProjectRewards"]["parameters"]["path"];
type GetRewardsQueryParams = operations["getProjectRewards"]["parameters"]["query"];

export type GetRewardsPortResponse = HttpStorageResponse<GetRewardsResponse>;

export type GetRewardsPortParams = HttpClientParameters<{
  PathParams: GetRewardsPathParams;
  QueryParams: GetRewardsQueryParams;
}>;

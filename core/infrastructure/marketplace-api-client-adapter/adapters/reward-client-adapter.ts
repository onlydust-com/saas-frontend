import { RewardListItem } from "@/core/domain/reward/models/reward-list-item-model";
import { RewardStoragePort } from "@/core/domain/reward/outputs/reward-storage-port";
import { GetProjectRewardsResponse } from "@/core/domain/reward/reward-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class RewardClientAdapter implements RewardStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectRewards: "projects/:projectId/rewards",
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
}

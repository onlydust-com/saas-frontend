import { GetContributionsResponse } from "@/core/domain/contribution/contribution-contract.types";
import { ContributionActivity } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionStoragePort } from "@/core/domain/contribution/output/contribution-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ContributionClientAdapter implements ContributionStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getContributions: "contributions",
  } as const;

  getContributions = ({ queryParams }: FirstParameter<ContributionStoragePort["getContributions"]>) => {
    const path = this.routes["getContributions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetContributionsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        contributions: data.contributions.map(contribution => new ContributionActivity(contribution)),
      };
    };

    return {
      request,
      tag,
    };
  };
}

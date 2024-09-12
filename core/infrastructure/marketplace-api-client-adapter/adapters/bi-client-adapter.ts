import { GetBiContributorsStatsResponse } from "@/core/domain/bi/bi-contract.types";
import { BiContributorsStats } from "@/core/domain/bi/models/bi-contributors-stats-model";
import { BiStoragePort } from "@/core/domain/bi/outputs/bi-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class BiClientAdapter implements BiStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getBiContributorsStats: "bi/stats/contributors",
  } as const;

  getBiContributorsStats = ({ pathParams, queryParams }: FirstParameter<BiStoragePort["getBiContributorsStats"]>) => {
    const path = this.routes["getBiContributorsStats"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBiContributorsStatsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        stats: data.stats.map(stat => new BiContributorsStats(stat)),
      };
    };

    return {
      request,
      tag,
    };
  };
}

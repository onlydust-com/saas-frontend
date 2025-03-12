import { GetLeaderboardResponse } from "@/core/domain/leaderboard/leaderboard-contract.types";
import { Leaderboard } from "@/core/domain/leaderboard/models/leaderboard-model";
import { LeaderboardStoragePort } from "@/core/domain/leaderboard/outputs/leaderboard-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class LeaderboardClientAdapter implements LeaderboardStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getLeaderboard: "leaderboards",
  } as const;

  getLeaderboard = ({ queryParams }: FirstParameter<LeaderboardStoragePort["getLeaderboard"]>) => {
    const path = this.routes["getLeaderboard"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetLeaderboardResponse>({
        path,
        method,
        tag,
      });

      return {
        ...data,
        rows: data.rows.map(row => new Leaderboard(row)),
      };
    };

    return {
      request,
      tag,
    };
  };
}

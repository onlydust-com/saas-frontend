import { LeaderboardStoragePort } from "@/core/domain/leaderboard/outputs/leaderboard-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class LeaderboardClientAdapterMock implements LeaderboardStoragePort {
  constructor() {}

  routes = {};

  getLeaderboard = mockHttpStorageResponse<LeaderboardStoragePort["getLeaderboard"]>;
}

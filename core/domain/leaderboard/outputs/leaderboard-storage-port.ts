import {
  GetLeaderboardPortParams,
  GetLeaderboardPortResponse,
} from "@/core/domain/leaderboard/leaderboard-contract.types";

export interface LeaderboardStoragePort {
  routes: Record<string, string>;
  getLeaderboard(p: GetLeaderboardPortParams): GetLeaderboardPortResponse;
}

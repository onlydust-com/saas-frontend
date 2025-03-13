import {
  GetLeaderboardPortParams,
  GetLeaderboardPortResponse,
} from "@/core/domain/leaderboard/leaderboard-contract.types";

export interface LeaderboardFacadePort {
  getLeaderboard(p: GetLeaderboardPortParams): GetLeaderboardPortResponse;
}

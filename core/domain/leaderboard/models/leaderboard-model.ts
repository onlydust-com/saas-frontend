import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type LeaderboardResponse = components["schemas"]["LeaderboardRowResponse"];

export interface LeaderboardInterface extends LeaderboardResponse {}

export class Leaderboard implements LeaderboardInterface {
  id!: LeaderboardResponse["id"];
  githubUserId!: LeaderboardResponse["githubUserId"];
  login!: LeaderboardResponse["login"];
  avatarUrl!: LeaderboardResponse["avatarUrl"];
  isRegistered!: LeaderboardResponse["isRegistered"];
  rank!: LeaderboardResponse["rank"];
  totalWorkScore!: LeaderboardResponse["totalWorkScore"];
  totalFidelityBonus!: LeaderboardResponse["totalFidelityBonus"];
  totalProjectBonus!: LeaderboardResponse["totalProjectBonus"];
  finalScore!: LeaderboardResponse["finalScore"];
  contributions!: LeaderboardResponse["contributions"];

  constructor(props: LeaderboardResponse) {
    Object.assign(this, props);
  }
}

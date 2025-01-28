type Count = {
  value: number;
  diff?: number;
};

export interface UserStatsProps {
  rewardCount?: Count;
  contributionCount?: Count;
  inProgressIssueCount?: number;
  prCount?: Count;
}

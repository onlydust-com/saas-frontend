type Count = {
  value: number;
  diff?: number;
};

export interface UserStatsProps {
  rewardCount?: Count;
  projectCount?: Count;
  inProgressIssueCount?: number;
  prCount?: Count;
}

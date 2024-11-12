export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "project"
  | "projectLeads"
  | "categories"
  | "languages"
  | "ecosystems"
  | "programs"
  | "availableBudget"
  | "percentUsedBudget"
  | "totalGrantedUsdAmount"
  | "averageRewardUsdAmount"
  | "onboardedContributorCount"
  | "activeContributorCount"
  | "prCount"
  | "rewardCount"
  | "contributionCount"
  | "engagementStatus";

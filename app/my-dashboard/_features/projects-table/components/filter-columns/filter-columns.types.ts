export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "name"
  | "leads"
  | "contributorCount"
  | "contributionCount"
  | "rewardedUsdAmount"
  | "languages"
  | "repos"
  | "issues"
  | "actions";

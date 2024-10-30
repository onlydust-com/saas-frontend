export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "contributor"
  | "projects"
  | "categories"
  | "languages"
  | "ecosystems"
  | "country"
  | "rewardedAmount"
  | "contributionCount"
  | "prCount"
  | "rewardCount";

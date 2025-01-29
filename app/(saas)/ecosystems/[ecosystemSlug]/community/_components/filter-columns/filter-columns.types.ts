export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns = "login" | "projects" | "issueAssigned" | "mergedPullRequestCount" | "totalEarnedUsdAmount";

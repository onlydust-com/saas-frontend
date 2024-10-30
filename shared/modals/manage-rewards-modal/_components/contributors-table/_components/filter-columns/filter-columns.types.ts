export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "select"
  | "contributor"
  | "labels"
  | "languages"
  | "ecosystems"
  | "country"
  | "rewardedAmount";

export interface FilterColumnsHookProps {
  projectId: string;
}

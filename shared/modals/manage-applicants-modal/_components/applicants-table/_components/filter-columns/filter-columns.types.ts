export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "contributor"
  | "labels"
  | "languages"
  | "ecosystems"
  | "country"
  | "rewardedAmount"
  | "actions";

export interface FilterColumnsHookProps {
  projectId: string;
  repoId: number;
  onAssign: () => void;
}

export type MyRewardsTableColumns =
  | "requestedAt"
  | "id"
  | "project"
  | "from"
  | "contributions"
  | "amount"
  | "status"
  | "actions";

export interface FilterColumnsProps {
  selectedIds?: Array<MyRewardsTableColumns>;
  setSelectedIds: (ids: Array<MyRewardsTableColumns>) => void;
}

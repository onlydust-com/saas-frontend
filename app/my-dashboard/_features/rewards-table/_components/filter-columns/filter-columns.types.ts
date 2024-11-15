export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "requestedAt"
  | "id"
  | "project"
  | "from"
  | "contributions"
  | "amount"
  | "status"
  | "actions";

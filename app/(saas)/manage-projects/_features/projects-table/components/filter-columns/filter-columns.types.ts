export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "name"
  | "leads"
  | "totalAvailable"
  | "contributorCount"
  | "totalGranted"
  | "totalRewarded"
  | "actions";

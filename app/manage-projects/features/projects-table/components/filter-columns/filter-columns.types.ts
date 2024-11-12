export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "id"
  | "slug"
  | "name"
  | "logoUrl"
  | "leads"
  | "totalAvailable"
  | "contributorCount"
  | "totalGranted"
  | "totalRewarded";

import { BiContributorResponse } from "@/core/domain/bi/models/bi-contributor-model";

export type ColumnMapKeys = keyof BiContributorResponse | "select" | "labels" | "actions";

export type ColumnMap = Partial<Record<ColumnMapKeys, object>>;

export interface FilterColumnsProps {
  selectedIds?: Array<ColumnMapKeys>;
  setSelectedIds: (ids: Array<ColumnMapKeys>) => void;
}

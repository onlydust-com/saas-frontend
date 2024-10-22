import { RewardListItemResponse } from "@/core/domain/reward/models/reward-list-item-model";

export type TableColumns = keyof RewardListItemResponse | "actions";

export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

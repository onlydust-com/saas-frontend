import { RewardListItemResponseV2 } from "@/core/domain/reward/models/reward-list-item-v2-model";

export type TableColumns = keyof RewardListItemResponseV2;

export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

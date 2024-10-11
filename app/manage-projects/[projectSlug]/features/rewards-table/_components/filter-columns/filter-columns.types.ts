import { RewardListItemResponse } from "@/core/domain/reward/models/reward-list-item-model";

export interface FilterColumnsProps {
  selectedIds?: Array<keyof RewardListItemResponse>;
  setSelectedIds: (ids: Array<keyof RewardListItemResponse>) => void;
}

import { QuestList } from "../../_features/quest-list/quest-list.types";

export interface QuestItem extends QuestList {
  id: string;
  longDescription: string;
  issues: number[];
  maintainers: number[];
}

export interface QuestCardProps extends QuestList {
  onClick?: () => void;
}

import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban";

export interface CardContributionKanbanActions {
  onReview?: (id: string) => void;
  onUnassign?: (id: string) => void;
  onArchive?: (id: string) => void;
  onReward?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onAction?: (id: string) => void;
}
export interface CardContributionKanbanProps extends CardContributionKanbanActions {
  contribution: ContributionActivityInterface;
  classNames?: CardContributionKanbanPort<"div">["classNames"];
}

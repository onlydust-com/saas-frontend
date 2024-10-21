import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban";

export interface CardContributionKanbanActions {
  onAction?: (id: string) => void;
}
export interface CardContributionKanbanProps extends CardContributionKanbanActions {
  contribution: ContributionActivityInterface;
  classNames?: CardContributionKanbanPort<"div">["classNames"];
}

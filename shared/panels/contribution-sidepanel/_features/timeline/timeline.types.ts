import { ContributionEventInterface } from "@/core/domain/contribution/models/contribution-event-model";

export interface TimelineProps {
  id: string;
}

export interface TimelineItemProps {
  event: ContributionEventInterface;
  isLast: boolean;
}

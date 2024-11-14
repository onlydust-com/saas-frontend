import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

export interface RewardedCardWrapperProps {
  contribution: ContributionActivityInterface;
  recipientIds?: number[];
}

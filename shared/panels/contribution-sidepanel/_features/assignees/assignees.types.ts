import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

export interface AssigneesProps {
  showRemove?: boolean;
  contributionGithubId: number;
  contributionType: ContributionActivityInterface["type"];
}

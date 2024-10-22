import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

export interface LinkedIssuesProps {
  issues: ContributionActivityInterface["linkedIssues"];
}

import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

export interface IssueOverviewProps {
  contribution: ContributionActivityInterface;
  showLinkedIssues?: boolean;
}

import { ContributionItemDto } from "@/core/domain/contribution/dto/contribution-item-dto";
import { UserOverview } from "@/core/domain/user/models/user-overview-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ContributionActivityResponse = components["schemas"]["ContributionActivityPageItemResponse"];

export interface ContributionActivityInterface
  extends Omit<ContributionActivityResponse, "applicants" | "contributors" | "assignees"> {
  applicants: UserOverview[];
  contributors: UserOverview[];
  assignees: UserOverview[];
  isNotAssigned(): boolean;
  isInProgress(): boolean;
  isToReview(): boolean;
  isArchived(): boolean;
  isDone(): boolean;
  toItemDto(): ContributionItemDto;
  canLinkIssues(): boolean;
}

export class ContributionActivity implements ContributionActivityInterface {
  githubId!: ContributionActivityResponse["githubId"];
  activityStatus!: ContributionActivityResponse["activityStatus"];
  applicants!: UserOverview[];
  completedAt!: ContributionActivityResponse["completedAt"];
  contributors!: UserOverview[];
  assignees!: UserOverview[];
  createdAt!: ContributionActivityResponse["createdAt"];
  githubAuthor!: ContributionActivityResponse["githubAuthor"];
  githubBody!: ContributionActivityResponse["githubBody"];
  githubCodeReviewOutcome!: ContributionActivityResponse["githubCodeReviewOutcome"];
  githubHtmlUrl!: ContributionActivityResponse["githubHtmlUrl"];
  githubLabels!: ContributionActivityResponse["githubLabels"];
  githubNumber!: ContributionActivityResponse["githubNumber"];
  githubStatus!: ContributionActivityResponse["githubStatus"];
  githubTitle!: ContributionActivityResponse["githubTitle"];
  id!: ContributionActivityResponse["id"];
  lastUpdatedAt!: ContributionActivityResponse["lastUpdatedAt"];
  linkedIssues!: ContributionActivityResponse["linkedIssues"];
  repo!: ContributionActivityResponse["repo"];
  totalRewardedAmount!: ContributionActivityResponse["totalRewardedAmount"];
  type!: ContributionActivityResponse["type"];

  constructor(props: ContributionActivityResponse) {
    Object.assign(this, props);
    this.applicants = (props.applicants ?? []).map(applicant => new UserOverview(applicant));
    this.assignees = (props.assignees ?? []).map(assignee => new UserOverview(assignee));
    this.contributors = (props.contributors ?? []).map(contributor => new UserOverview(contributor));
  }

  isNotAssigned(): boolean {
    return this.activityStatus === "NOT_ASSIGNED";
  }

  isInProgress(): boolean {
    return this.activityStatus === "IN_PROGRESS";
  }

  isToReview(): boolean {
    return this.activityStatus === "TO_REVIEW";
  }

  isArchived(): boolean {
    return this.activityStatus === "ARCHIVED";
  }

  isDone(): boolean {
    return this.activityStatus === "DONE";
  }

  canLinkIssues(): boolean {
    return this.type === "PULL_REQUEST";
  }

  toItemDto(): ContributionItemDto {
    return new ContributionItemDto({
      type: this.type,
      id: this.githubId?.toString(),
      number: this.githubNumber,
      repoId: this.repo?.id,
    });
  }
}

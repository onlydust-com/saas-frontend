import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ContributionActivityResponse = components["schemas"]["ContributionActivityPageItemResponse"];

export interface ContributionActivityInterface extends ContributionActivityResponse {
  isActivityStatusNotAssigned(): boolean;
  isActivityStatusInProgress(): boolean;
  isActivityStatusToReview(): boolean;
  isActivityStatusDone(): boolean;
  isActivityStatusArchived(): boolean;
  canShowLinkedIssues(): boolean;
}

export class ContributionActivity implements ContributionActivityInterface {
  activityStatus!: ContributionActivityResponse["activityStatus"];
  applicants!: ContributionActivityResponse["applicants"];
  completedAt!: ContributionActivityResponse["completedAt"];
  contributors!: ContributionActivityResponse["contributors"];
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
  }

  isActivityStatusNotAssigned() {
    return this.activityStatus === "NOT_ASSIGNED";
  }

  isActivityStatusInProgress() {
    return this.activityStatus === "IN_PROGRESS";
  }

  isActivityStatusToReview() {
    return this.activityStatus === "TO_REVIEW";
  }

  isActivityStatusDone() {
    return this.activityStatus === "DONE";
  }

  isActivityStatusArchived() {
    return this.activityStatus === "ARCHIVED";
  }

  canShowLinkedIssues() {
    return (
      (this.linkedIssues ?? []).length > 0 &&
      (this.isActivityStatusToReview() || this.isActivityStatusDone() || this.isActivityStatusArchived())
    );
  }
}

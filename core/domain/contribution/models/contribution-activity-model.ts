import { UserOverview } from "@/core/domain/user/models/user-overview-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ContributionActivityResponse = components["schemas"]["ContributionActivityPageItemResponse"];

export interface ContributionActivityInterface
  extends Omit<ContributionActivityResponse, "applicants" | "contributors" | "assignees"> {
  applicants: UserOverview[];
  contributors: UserOverview[];
  assignees: UserOverview[];
}

export class ContributionActivity implements ContributionActivityInterface {
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
}

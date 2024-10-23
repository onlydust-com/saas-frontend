import { ContributionItemDto } from "@/core/domain/contribution/dto/contribution-item-dto";
import { GithubUser, GithubUserInterface } from "@/core/domain/github/models/github-user-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ContributionActivityResponse = components["schemas"]["ContributionActivityPageItemResponse"];

export interface ContributionActivityInterface
  extends Omit<ContributionActivityResponse, "applicants" | "contributors" | "assignees" | "uuid"> {
  applicants: GithubUserInterface[];
  contributors: components["schemas"]["DatedGithubUserResponse"][];
  isNotAssigned(): boolean;
  isInProgress(): boolean;
  isToReview(): boolean;
  isArchived(): boolean;
  isDone(): boolean;
  toItemDto(): ContributionItemDto;
  canLinkIssues(): boolean;
  isIssue(): boolean;
  isPullRequest(): boolean;
  isCodeReview(): boolean;
  id: string;
}

export class ContributionActivity implements ContributionActivityInterface {
  activityStatus!: ContributionActivityResponse["activityStatus"];
  applicants!: GithubUserInterface[];
  completedAt!: ContributionActivityResponse["completedAt"];
  contributors!: components["schemas"]["DatedGithubUserResponse"][];
  createdAt!: ContributionActivityResponse["createdAt"];
  githubAuthor!: ContributionActivityResponse["githubAuthor"];
  githubBody!: ContributionActivityResponse["githubBody"];
  githubHtmlUrl!: ContributionActivityResponse["githubHtmlUrl"];
  githubLabels!: ContributionActivityResponse["githubLabels"];
  githubNumber!: ContributionActivityResponse["githubNumber"];
  githubStatus!: ContributionActivityResponse["githubStatus"];
  githubTitle!: ContributionActivityResponse["githubTitle"];
  languages!: ContributionActivityResponse["languages"];
  lastUpdatedAt!: ContributionActivityResponse["lastUpdatedAt"];
  linkedIssues!: ContributionActivityResponse["linkedIssues"];
  project!: ContributionActivityResponse["project"];
  repo!: ContributionActivityResponse["repo"];
  totalRewardedUsdAmount!: ContributionActivityResponse["totalRewardedUsdAmount"];
  type!: ContributionActivityResponse["type"];
  id!: ContributionActivityResponse["uuid"];
  githubId!: ContributionActivityResponse["githubId"];

  constructor(props: ContributionActivityResponse) {
    Object.assign(this, props);
    this.applicants = (props.applicants ?? []).map(applicant => new GithubUser(applicant));
    this.contributors = props.contributors ?? [];
    this.id = props.uuid;
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

  isIssue(): boolean {
    return this.type === "ISSUE";
  }

  isPullRequest(): boolean {
    return this.type === "PULL_REQUEST";
  }

  isCodeReview(): boolean {
    return this.type === "CODE_REVIEW";
  }

  toItemDto(): ContributionItemDto {
    return new ContributionItemDto({
      type: this.type,
      id: this.githubId,
      number: this.githubNumber,
      repoId: this.repo?.id,
      uuid: this.id,
    });
  }
}

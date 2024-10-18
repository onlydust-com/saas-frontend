import {
  ContributionActivity,
  ContributionActivityInterface,
} from "@/core/domain/contribution/models/contribution-activity-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type RewardableItemResponse = components["schemas"]["RewardableItemResponse"];

export interface RewardableItemInterface extends RewardableItemResponse {
  toContributionActivityModel(): ContributionActivityInterface;
}

export class RewardableItem implements RewardableItemInterface {
  author!: RewardableItemResponse["author"];
  commentsCount!: RewardableItemResponse["commentsCount"];
  commitsCount!: RewardableItemResponse["commitsCount"];
  completedAt!: RewardableItemResponse["completedAt"];
  contributionId!: RewardableItemResponse["contributionId"];
  createdAt!: RewardableItemResponse["createdAt"];
  githubBody!: RewardableItemResponse["githubBody"];
  htmlUrl!: RewardableItemResponse["htmlUrl"];
  id!: RewardableItemResponse["id"];
  ignored!: RewardableItemResponse["ignored"];
  number!: RewardableItemResponse["number"];
  repoId!: RewardableItemResponse["repoId"];
  repoName!: RewardableItemResponse["repoName"];
  status!: RewardableItemResponse["status"];
  title!: RewardableItemResponse["title"];
  type!: RewardableItemResponse["type"];
  userCommitsCount!: RewardableItemResponse["userCommitsCount"];

  constructor(props: RewardableItemResponse) {
    Object.assign(this, props);
  }

  toContributionActivityModel(): ContributionActivityInterface {
    return new ContributionActivity({
      activityStatus: "IN_PROGRESS",
      applicants: [],
      completedAt: this.completedAt,
      contributors: [],
      createdAt: this.createdAt,
      githubAuthor: this.author ?? {
        login: "",
        avatarUrl: "",
        githubUserId: 0,
      },
      githubBody: this.githubBody,
      githubHtmlUrl: this.htmlUrl,
      githubId: Number(this.id),
      githubLabels: [],
      githubNumber: this.number,
      githubStatus: this.status,
      githubTitle: this.title,
      languages: [],
      lastUpdatedAt: this.createdAt,
      linkedIssues: [],
      project: undefined,
      repo: {
        id: this.repoId,
        owner: "",
        name: this.repoName,
        htmlUrl: "",
      },
      totalRewardedUsdAmount: 0,
      type: this.type,
    });
  }
}

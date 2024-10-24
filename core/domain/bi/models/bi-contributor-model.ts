import { UserPublic, UserPublicInterface } from "@/core/domain/user/models/user-public-model";
import { UserRank, UserRankInterface } from "@/core/domain/user/models/user-rank-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BiContributorResponse = components["schemas"]["BiContributorsPageItemResponse"];

export interface BiContributorInterface extends BiContributorResponse {
  rank: UserRankInterface;
  toContributorPublicModel(): UserPublicInterface;
}

export class BiContributor implements BiContributorInterface {
  categories!: BiContributorResponse["categories"];
  codeReviewCount!: BiContributorResponse["codeReviewCount"];
  contributionCount!: BiContributorResponse["contributionCount"];
  contributor!: BiContributorResponse["contributor"];
  countryCode!: BiContributorResponse["countryCode"];
  ecosystems!: BiContributorResponse["ecosystems"];
  issueCount!: BiContributorResponse["issueCount"];
  languages!: BiContributorResponse["languages"];
  prCount!: BiContributorResponse["prCount"];
  projects!: BiContributorResponse["projects"];
  rewardCount!: BiContributorResponse["rewardCount"];
  totalRewardedUsdAmount!: BiContributorResponse["totalRewardedUsdAmount"];
  inProgressIssueCount!: BiContributorResponse["inProgressIssueCount"];
  maintainedProjectCount!: BiContributorResponse["maintainedProjectCount"];
  pendingApplicationCount!: BiContributorResponse["pendingApplicationCount"];
  projectContributorLabels!: BiContributorResponse["projectContributorLabels"];
  rank: UserRankInterface;

  constructor(props: BiContributorResponse) {
    Object.assign(this, props);
    this.rank = new UserRank({
      rankCategory: this.contributor.globalRankCategory,
      rank: this.contributor.globalRank,
      rankPercentile: this.contributor.globalRankPercentile,
    });
  }

  toContributorPublicModel(): UserPublicInterface {
    return new UserPublic({
      ...this.contributor,
      statsSummary: {
        rank: this.contributor?.globalRank,
        rankPercentile: this?.contributor?.globalRankPercentile,
        rankCategory: this?.contributor?.globalRankCategory,
        contributedProjectCount: 0,
        leadedProjectCount: 0,
        contributionCount: this.contributionCount.value,
        rewardCount: this.rewardCount.value,
      },
    });
  }
}

import { UserPublic, UserPublicInterface } from "@/core/domain/user/models/user-public-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type UserOverviewResponse = components["schemas"]["ContributorOverviewResponse"];

export interface UserOverviewInterface extends UserOverviewResponse {
  toPublicModel(): UserPublicInterface;
}

export class UserOverview implements UserOverviewInterface {
  languages!: UserOverviewResponse["languages"];
  countryCode!: UserOverviewResponse["countryCode"];
  isRegistered!: UserOverviewResponse["isRegistered"];
  totalRewardedUsdAmount!: UserOverviewResponse["totalRewardedUsdAmount"];
  githubUserId!: UserOverviewResponse["githubUserId"];
  login!: UserOverviewResponse["login"];
  avatarUrl!: UserOverviewResponse["avatarUrl"];
  id!: UserOverviewResponse["id"];
  bio!: UserOverviewResponse["bio"];
  signedUpOnGithubAt!: UserOverviewResponse["signedUpOnGithubAt"];
  signedUpAt!: UserOverviewResponse["signedUpAt"];
  lastSeenAt!: UserOverviewResponse["lastSeenAt"];
  contacts!: UserOverviewResponse["contacts"];
  globalRank!: UserOverviewResponse["globalRank"];
  globalRankPercentile!: UserOverviewResponse["globalRankPercentile"];
  globalRankCategory!: UserOverviewResponse["globalRankCategory"];
  ecosystems!: UserOverviewResponse["ecosystems"];
  rewardCount!: UserOverviewResponse["rewardCount"];
  issueCount!: UserOverviewResponse["issueCount"];
  prCount!: UserOverviewResponse["prCount"];
  codeReviewCount!: UserOverviewResponse["codeReviewCount"];
  contributionCount!: UserOverviewResponse["contributionCount"];

  constructor(props: UserOverviewResponse) {
    Object.assign(this, props);
  }

  toPublicModel(): UserPublicInterface {
    return new UserPublic({
      ...this,
      statsSummary: {
        rank: this.globalRank,
        rankPercentile: this?.globalRankPercentile,
        rankCategory: this?.globalRankCategory,
        contributedProjectCount: 0,
        leadedProjectCount: 0,
        contributionCount: this.contributionCount,
        rewardCount: this.rewardCount,
      },
    });
  }
}

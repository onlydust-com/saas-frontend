import { UserPublic, UserPublicInterface } from "@/core/domain/user/models/user-public-model";
import { UserRank, UserRankInterface } from "@/core/domain/user/models/user-rank-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorOverviewResponse = components["schemas"]["ContributorOverviewResponse"];

export interface ContributorOverviewInterface extends ContributorOverviewResponse {
  toPublicModel(): UserPublicInterface;
  rank: UserRankInterface;
}

export class ContributorOverview implements ContributorOverviewInterface {
  avatarUrl!: ContributorOverviewResponse["avatarUrl"];
  bio!: ContributorOverviewResponse["bio"];
  contacts!: ContributorOverviewResponse["contacts"];
  githubUserId!: ContributorOverviewResponse["githubUserId"];
  globalRank!: ContributorOverviewResponse["globalRank"];
  globalRankCategory!: ContributorOverviewResponse["globalRankCategory"];
  globalRankPercentile!: ContributorOverviewResponse["globalRankPercentile"];
  id!: ContributorOverviewResponse["id"];
  isRegistered!: ContributorOverviewResponse["isRegistered"];
  login!: ContributorOverviewResponse["login"];
  signedUpAt!: ContributorOverviewResponse["signedUpAt"];
  signedUpOnGithubAt!: ContributorOverviewResponse["signedUpOnGithubAt"];
  rank: UserRankInterface;

  constructor(props: ContributorOverviewResponse) {
    Object.assign(this, props);

    this.rank = new UserRank({
      rankCategory: this.globalRankCategory,
      rank: this.globalRank,
      rankPercentile: this.globalRankPercentile,
    });
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
        contributionCount: 0,
        rewardCount: 0,
      },
    });
  }
}

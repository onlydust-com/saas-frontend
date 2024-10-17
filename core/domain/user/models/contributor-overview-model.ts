import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorOverviewResponse = components["schemas"]["ContributorOverviewResponse"];

export interface ContributorOverviewInterface extends ContributorOverviewResponse {}

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

  constructor(props: ContributorOverviewResponse) {
    Object.assign(this, props);
  }
}

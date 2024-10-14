import { UserRank, UserRankInterface } from "@/core/domain/user/models/user-rank-model";
import { UserProfileContact, UserProfileContactChannel } from "@/core/domain/user/models/user.types";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type UserPublicResponse = components["schemas"]["PublicUserProfileResponseV2"];

export interface UserPublicInterface extends UserPublicResponse {
  getContact(channel: UserProfileContactChannel): UserProfileContact | undefined;
  rank: UserRankInterface;
}

export class UserPublic implements UserPublicInterface {
  githubUserId!: UserPublicResponse["githubUserId"];
  login!: UserPublicResponse["login"];
  avatarUrl!: UserPublicResponse["avatarUrl"];
  id!: UserPublicResponse["id"];
  htmlUrl!: UserPublicResponse["htmlUrl"];
  location!: UserPublicResponse["location"];
  bio!: UserPublicResponse["bio"];
  website!: UserPublicResponse["website"];
  signedUpOnGithubAt!: UserPublicResponse["signedUpOnGithubAt"];
  signedUpAt!: UserPublicResponse["signedUpAt"];
  lastSeenAt!: UserPublicResponse["lastSeenAt"];
  contacts!: UserPublicResponse["contacts"];
  statsSummary!: UserPublicResponse["statsSummary"];
  ecosystems!: UserPublicResponse["ecosystems"];
  rank: UserRankInterface;

  constructor(props: UserPublicResponse) {
    Object.assign(this, props);
    this.rank = new UserRank({
      rankCategory: this.statsSummary?.rankCategory,
      rank: this.statsSummary?.rank,
      rankPercentile: this.statsSummary?.rankPercentile,
    });
  }

  getContact(channel: UserProfileContactChannel) {
    return this.contacts?.find(c => c.channel === channel && c.contact && c.visibility === "public");
  }
}

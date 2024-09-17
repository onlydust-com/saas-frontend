import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type UserPublicResponse = components["schemas"]["PublicUserProfileResponseV2"];

export interface UserPublicInterface extends UserPublicResponse {}

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

  constructor(props: UserPublicResponse) {
    Object.assign(this, props);
  }
}

import { UserProfileContact, UserProfileContactChannel } from "@/core/domain/user/models/user.types";
import { userRankCategoryEmojiMapping, userRankCategoryMapping } from "@/core/domain/user/user-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type UserPublicResponse = components["schemas"]["PublicUserProfileResponseV2"];

export interface UserPublicInterface extends UserPublicResponse {
  getRank(): string;
  getContact(channel: UserProfileContactChannel): UserProfileContact | undefined;
  getTitle(): {
    wording?: string;
    emoji?: string;
    full?: string;
  };
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

  constructor(props: UserPublicResponse) {
    Object.assign(this, props);
  }

  getRank(): string {
    const position = this.statsSummary?.rank;

    if (typeof position !== "number") {
      return "";
    }
    // Check the last two digits to handle special cases like 11th, 12th, 13th, etc.
    const lastTwoDigits = position % 100;
    if (lastTwoDigits >= 10 && lastTwoDigits <= 19) {
      return `${position}th`;
    }

    // Check the last digit to determine the correct suffix
    switch (position % 10) {
      case 1:
        return `${position}st`;
      case 2:
        return `${position}nd`;
      case 3:
        return `${position}rd`;
      default:
        return `${position}th`;
    }
  }

  getTitle() {
    if (!this.statsSummary?.rankCategory) {
      return {
        wording: undefined,
        emoji: undefined,
        full: undefined,
      };
    }

    const emoji = userRankCategoryEmojiMapping[this.statsSummary.rankCategory];
    const wording = userRankCategoryMapping[this.statsSummary.rankCategory];

    return {
      wording,
      emoji,
      full: `${emoji} ${wording}`,
    };
  }

  getContact(channel: UserProfileContactChannel) {
    return this.contacts?.find(c => c.channel === channel && c.contact && c.visibility === "public");
  }
}

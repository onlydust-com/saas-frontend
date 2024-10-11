import { userRankCategoryEmojiMapping, userRankCategoryMapping } from "@/core/domain/user/user-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

interface UserRankInterfaceContract {
  rankPercentile?: number;
  rank?: number | undefined;
  rankCategory?: components["schemas"]["ContributorOverviewResponse"]["globalRankCategory"];
}

export interface UserRankInterface extends UserRankInterfaceContract {
  getRank(): string;
  shouldShowRankPercentile(): boolean;
  getTitle(): {
    wording?: string;
    emoji?: string;
    full?: string;
  };
}

export class UserRank implements UserRankInterface {
  rankPercentile!: UserRankInterface["rankPercentile"];
  rank!: UserRankInterface["rank"];
  rankCategory!: UserRankInterface["rankCategory"];

  constructor(props: UserRankInterfaceContract) {
    Object.assign(this, props);
  }

  getRank(): string {
    const position = this.rank;

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
    if (!this.rankCategory) {
      return {
        wording: undefined,
        emoji: undefined,
        full: undefined,
      };
    }

    const emoji = userRankCategoryEmojiMapping[this.rankCategory];
    const wording = userRankCategoryMapping[this.rankCategory];

    return {
      wording,
      emoji,
      full: `${emoji} ${wording}`,
    };
  }

  shouldShowRankPercentile() {
    return !!this.rankPercentile && this.rankPercentile !== 100;
  }
}

import { userRankCategoryEmojiMapping, userRankCategoryMapping } from "@/core/domain/user/user-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ApplicationListItemResponse = components["schemas"]["ProjectApplicationPageItemResponse"];

export interface ApplicationListItemInterface extends ApplicationListItemResponse {
  getRank(): string;
  getApplicantTitle(): {
    wording?: string;
    emoji?: string;
    full?: string;
  };
}

export class ApplicationListItem implements ApplicationListItemInterface {
  applicant!: ApplicationListItemResponse["applicant"];
  id!: ApplicationListItemResponse["id"];
  isApplicantProjectMember!: ApplicationListItemResponse["isApplicantProjectMember"];
  issue!: ApplicationListItemResponse["issue"];
  project!: ApplicationListItemResponse["project"];
  receivedAt!: ApplicationListItemResponse["receivedAt"];
  status!: ApplicationListItemResponse["status"];
  isIgnored!: ApplicationListItemResponse["isIgnored"];

  constructor(props: ApplicationListItemResponse) {
    Object.assign(this, props);
  }

  getRank(): string {
    const position = this.applicant?.globalRank;

    if (position === undefined) {
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

  getApplicantTitle() {
    if (!this.applicant?.globalRankCategory) {
      return {
        wording: undefined,
        emoji: undefined,
        full: undefined,
      };
    }

    const emoji = userRankCategoryEmojiMapping[this.applicant.globalRankCategory];
    const wording = userRankCategoryMapping[this.applicant.globalRankCategory];

    return {
      wording,
      emoji,
      full: `${emoji} ${wording}`,
    };
  }
}

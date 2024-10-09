import { userRankCategoryEmojiMapping, userRankCategoryMapping } from "@/core/domain/user/user-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ApplicationListItemResponse = components["schemas"]["ProjectApplicationPageItemResponse"];

export interface ApplicationListItemInterface extends ApplicationListItemResponse {
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

  constructor(props: ApplicationListItemResponse) {
    Object.assign(this, props);
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

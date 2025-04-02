import { UserRank, UserRankInterface } from "@/core/domain/user/models/user-rank-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ApplicationListItemResponse = components["schemas"]["ProjectApplicationPageItemResponse"];

export interface ApplicationListItemInterface extends ApplicationListItemResponse {
  applicantRank: UserRankInterface;
}

export class ApplicationListItem implements ApplicationListItemInterface {
  id!: ApplicationListItemResponse["id"];
  project!: ApplicationListItemResponse["project"];
  issue!: ApplicationListItemResponse["issue"];
  applicant!: ApplicationListItemResponse["applicant"];
  receivedAt!: ApplicationListItemResponse["receivedAt"];
  applicantRank: UserRankInterface;

  constructor(props: ApplicationListItemResponse) {
    Object.assign(this, props);

    this.applicantRank = new UserRank({
      rankCategory: this.applicant.globalRankCategory,
      rank: this.applicant.globalRank,
      rankPercentile: this.applicant.globalRankPercentile,
    });
  }
}

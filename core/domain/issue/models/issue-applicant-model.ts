import {
  ContributorOverview,
  ContributorOverviewInterface,
} from "@/core/domain/user/models/contributor-overview-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type IssueApplicantResponse = components["schemas"]["IssueApplicantsPageItemResponse"];

export interface IssueApplicantInterface extends IssueApplicantResponse {
  contributor: ContributorOverviewInterface;
}

export class IssueApplicant implements IssueApplicantInterface {
  applicationId!: IssueApplicantResponse["applicationId"];
  categories!: IssueApplicantResponse["categories"];
  codeReviewCount!: IssueApplicantResponse["codeReviewCount"];
  contributionCount!: IssueApplicantResponse["contributionCount"];
  contributor!: ContributorOverviewInterface;
  countryCode!: IssueApplicantResponse["countryCode"];
  ecosystems!: IssueApplicantResponse["ecosystems"];
  issueCount!: IssueApplicantResponse["issueCount"];
  languages!: IssueApplicantResponse["languages"];
  prCount!: IssueApplicantResponse["prCount"];
  projectContributorLabels!: IssueApplicantResponse["projectContributorLabels"];
  projects!: IssueApplicantResponse["projects"];
  rewardCount!: IssueApplicantResponse["rewardCount"];
  totalRewardedUsdAmount!: IssueApplicantResponse["totalRewardedUsdAmount"];

  constructor(props: IssueApplicantResponse) {
    Object.assign(this, props);

    this.contributor = new ContributorOverview(props.contributor);
  }
}

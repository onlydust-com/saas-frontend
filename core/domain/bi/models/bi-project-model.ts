import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BiProjectResponse = components["schemas"]["BiProjectsPageItemResponse"];

export interface BiProjectInterface extends BiProjectResponse {}

export class BiProject implements BiProjectInterface {
  activeContributorCount!: BiProjectResponse["activeContributorCount"];
  availableBudget!: BiProjectResponse["availableBudget"];
  averageRewardUsdAmount!: BiProjectResponse["averageRewardUsdAmount"];
  categories!: BiProjectResponse["categories"];
  contributionCount!: BiProjectResponse["contributionCount"];
  ecosystems!: BiProjectResponse["ecosystems"];
  languages!: BiProjectResponse["languages"];
  mergedPrCount!: BiProjectResponse["mergedPrCount"];
  onboardedContributorCount!: BiProjectResponse["onboardedContributorCount"];
  percentUsedBudget!: BiProjectResponse["percentUsedBudget"];
  programs!: BiProjectResponse["programs"];
  project!: BiProjectResponse["project"];
  projectLeads!: BiProjectResponse["projectLeads"];
  rewardCount!: BiProjectResponse["rewardCount"];
  totalGrantedUsdAmount!: BiProjectResponse["totalGrantedUsdAmount"];
  totalRewardedUsdAmount!: BiProjectResponse["totalRewardedUsdAmount"];

  constructor(props: BiProjectResponse) {
    Object.assign(this, props);
  }
}

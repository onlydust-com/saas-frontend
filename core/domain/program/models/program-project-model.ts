import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProgramProjectResponse = components["schemas"]["ProgramProjectsPageItemResponse"];

export interface ProgramProjectInterface extends ProgramProjectResponse {}

export class ProgramProject implements ProgramProjectInterface {
  activeContributorsCount!: ProgramProjectResponse["activeContributorsCount"];
  averageRewardUsdAmount!: ProgramProjectResponse["averageRewardUsdAmount"];
  id!: ProgramProjectResponse["id"];
  leads!: ProgramProjectResponse["leads"];
  logoUrl!: ProgramProjectResponse["logoUrl"];
  mergedPrCount!: ProgramProjectResponse["mergedPrCount"];
  name!: ProgramProjectResponse["name"];
  newContributorsCount!: ProgramProjectResponse["newContributorsCount"];
  percentUsedBudget!: ProgramProjectResponse["percentUsedBudget"];
  slug!: ProgramProjectResponse["slug"];
  totalAvailable!: ProgramProjectResponse["totalAvailable"];
  totalGranted!: ProgramProjectResponse["totalGranted"];
  totalRewarded!: ProgramProjectResponse["totalRewarded"];
  categories!: ProgramProjectResponse["categories"];
  languages!: ProgramProjectResponse["languages"];
  shortDescription!: ProgramProjectResponse["shortDescription"];

  constructor(props: ProgramProjectResponse) {
    Object.assign(this, props);
  }
}

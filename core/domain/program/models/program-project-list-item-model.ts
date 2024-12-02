import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProgramProjectListItemResponse = components["schemas"]["ProgramProjectPageItemResponse"];

export interface ProgramProjectListItemInterface extends ProgramProjectListItemResponse {
  truncateDescription(max: number): string;
}

export class ProgramProjectListItem implements ProgramProjectListItemInterface {
  activeContributorsCount!: ProgramProjectListItemResponse["activeContributorsCount"];
  averageRewardUsdAmount!: ProgramProjectListItemResponse["averageRewardUsdAmount"];
  categories!: ProgramProjectListItemResponse["categories"];
  id!: ProgramProjectListItemResponse["id"];
  languages!: ProgramProjectListItemResponse["languages"];
  leads!: ProgramProjectListItemResponse["leads"];
  logoUrl!: ProgramProjectListItemResponse["logoUrl"];
  mergedPrCount!: ProgramProjectListItemResponse["mergedPrCount"];
  name!: ProgramProjectListItemResponse["name"];
  newContributorsCount!: ProgramProjectListItemResponse["newContributorsCount"];
  percentUsedBudget!: ProgramProjectListItemResponse["percentUsedBudget"];
  shortDescription!: ProgramProjectListItemResponse["shortDescription"];
  slug!: ProgramProjectListItemResponse["slug"];
  totalAvailable!: ProgramProjectListItemResponse["totalAvailable"];
  totalGranted!: ProgramProjectListItemResponse["totalGranted"];
  totalRewarded!: ProgramProjectListItemResponse["totalRewarded"];

  constructor(props: ProgramProjectListItemResponse) {
    Object.assign(this, props);
  }

  truncateDescription(max: number) {
    return this.shortDescription.length > max ? `${this.shortDescription.slice(0, max)}...` : this.shortDescription;
  }
}

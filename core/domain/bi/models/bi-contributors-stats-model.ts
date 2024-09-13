import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BiContributorsStatsResponse = components["schemas"]["BiContributorsStatsListItemResponse"];

export interface BiContributorsStatsInterface extends BiContributorsStatsResponse {}

export class BiContributorsStats implements BiContributorsStatsInterface {
  activeContributorCount!: BiContributorsStatsResponse["activeContributorCount"];
  churnedContributorCount!: BiContributorsStatsResponse["churnedContributorCount"];
  mergedPrCount!: BiContributorsStatsResponse["mergedPrCount"];
  newContributorCount!: BiContributorsStatsResponse["newContributorCount"];
  reactivatedContributorCount!: BiContributorsStatsResponse["reactivatedContributorCount"];
  timestamp!: BiContributorsStatsResponse["timestamp"];
  totalGranted!: BiContributorsStatsResponse["totalGranted"];
  totalRewarded!: BiContributorsStatsResponse["totalRewarded"];

  constructor(props: BiContributorsStatsResponse) {
    Object.assign(this, props);
  }
}

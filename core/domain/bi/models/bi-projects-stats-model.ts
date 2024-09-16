import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BiProjectsStatsResponse = components["schemas"]["BiProjectsStatsListItemResponse"];

export interface BiProjectsStatsInterface extends BiProjectsStatsResponse {}

export class BiProjectsStats implements BiProjectsStatsInterface {
  activeProjectCount!: BiProjectsStatsResponse["activeProjectCount"];
  churnedProjectCount!: BiProjectsStatsResponse["churnedProjectCount"];
  mergedPrCount!: BiProjectsStatsResponse["mergedPrCount"];
  newProjectCount!: BiProjectsStatsResponse["newProjectCount"];
  reactivatedProjectCount!: BiProjectsStatsResponse["reactivatedProjectCount"];
  timestamp!: BiProjectsStatsResponse["timestamp"];
  totalGranted!: BiProjectsStatsResponse["totalGranted"];
  totalRewarded!: BiProjectsStatsResponse["totalRewarded"];

  constructor(props: BiProjectsStatsResponse) {
    Object.assign(this, props);
  }
}

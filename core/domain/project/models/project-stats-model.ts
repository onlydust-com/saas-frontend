import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProjectStatsResponse = components["schemas"]["ProjectStatsResponse"];

export interface ProjectStatsInterface extends ProjectStatsResponse {}

export class ProjectStats implements ProjectStatsInterface {
  activeContributorCount!: ProjectStatsResponse["activeContributorCount"];
  mergedPrCount!: ProjectStatsResponse["mergedPrCount"];
  rewardCount!: ProjectStatsResponse["rewardCount"];
  totalGranted!: ProjectStatsResponse["totalGranted"];
  totalRewarded!: ProjectStatsResponse["totalRewarded"];

  constructor(props: ProjectStatsResponse) {
    Object.assign(this, props);
  }
}

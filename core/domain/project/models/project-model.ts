import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProjectResponse = components["schemas"]["ProjectResponse"];

export interface ProjectInterface extends ProjectResponse {
  truncateDescription(max: number): string;
}

export class Project implements ProjectInterface {
  id!: ProjectResponse["id"];
  slug!: ProjectResponse["slug"];
  name!: ProjectResponse["name"];
  createdAt!: ProjectResponse["createdAt"];
  shortDescription!: ProjectResponse["shortDescription"];
  longDescription!: ProjectResponse["longDescription"];
  logoUrl!: ProjectResponse["logoUrl"];
  moreInfos!: ProjectResponse["moreInfos"];
  hiring!: ProjectResponse["hiring"];
  visibility!: ProjectResponse["visibility"];
  contributorCount!: ProjectResponse["contributorCount"];
  topContributors!: ProjectResponse["topContributors"];
  organizations!: ProjectResponse["organizations"];
  leaders!: ProjectResponse["leaders"];
  invitedLeaders!: ProjectResponse["invitedLeaders"];
  ecosystems!: ProjectResponse["ecosystems"];
  categories!: ProjectResponse["categories"];
  categorySuggestions!: ProjectResponse["categorySuggestions"];
  programs!: ProjectResponse["programs"];
  languages!: ProjectResponse["languages"];
  hasRemainingBudget!: ProjectResponse["hasRemainingBudget"];
  rewardSettings!: ProjectResponse["rewardSettings"];
  indexingComplete!: ProjectResponse["indexingComplete"];
  indexedAt!: ProjectResponse["indexedAt"];
  me!: ProjectResponse["me"];
  tags!: ProjectResponse["tags"];
  goodFirstIssueCount!: ProjectResponse["goodFirstIssueCount"];

  constructor(props: ProjectResponse) {
    Object.assign(this, props);
  }

  truncateDescription(max: number) {
    return this.shortDescription.length > max ? `${this.shortDescription.slice(0, max)}...` : this.shortDescription;
  }
}

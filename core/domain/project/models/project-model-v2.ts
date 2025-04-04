import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategory, ProjectCategoryInterface } from "../../project-category/models/project-category-model";

type ProjectOrRepoResponseV2 = components["schemas"]["ProjectOrRepoResponseV2"];

export interface ProjectInterfaceV2 extends ProjectOrRepoResponseV2 {
  categories: ProjectCategoryInterface[];
}

export class ProjectV2 implements ProjectInterfaceV2 {
  id!: ProjectOrRepoResponseV2["id"];
  slug!: ProjectOrRepoResponseV2["slug"];
  name!: ProjectOrRepoResponseV2["name"];
  logoUrl!: ProjectOrRepoResponseV2["logoUrl"];
  shortDescription!: ProjectOrRepoResponseV2["shortDescription"];
  longDescription!: ProjectOrRepoResponseV2["longDescription"];
  contributorCount!: ProjectOrRepoResponseV2["contributorCount"];
  starCount!: ProjectOrRepoResponseV2["starCount"];
  forkCount!: ProjectOrRepoResponseV2["forkCount"];
  availableIssueCount!: ProjectOrRepoResponseV2["availableIssueCount"];
  goodFirstIssueCount!: ProjectOrRepoResponseV2["goodFirstIssueCount"];
  categories!: ProjectCategoryInterface[];
  languages!: ProjectOrRepoResponseV2["languages"];
  ecosystems!: ProjectOrRepoResponseV2["ecosystems"];
  leads!: ProjectOrRepoResponseV2["leads"];
  moreInfos!: ProjectOrRepoResponseV2["moreInfos"];
  mergedPrCount!: ProjectOrRepoResponseV2["mergedPrCount"];
  currentWeekAvailableIssueCount!: ProjectOrRepoResponseV2["currentWeekAvailableIssueCount"];
  currentWeekMergedPrCount!: ProjectOrRepoResponseV2["currentWeekMergedPrCount"];
  tags!: ProjectOrRepoResponseV2["tags"];
  repos!: ProjectOrRepoResponseV2["repos"];
  odHackStats!: ProjectOrRepoResponseV2["odHackStats"];
  contributorStats!: ProjectOrRepoResponseV2["contributorStats"];
  isProject!: ProjectOrRepoResponseV2["isProject"];
  overview!: ProjectOrRepoResponseV2["overview"];

  constructor(props: ProjectOrRepoResponseV2) {
    Object.assign(this, props);
    this.categories = (props.categories || []).map(category => new ProjectCategory(category));
  }
}

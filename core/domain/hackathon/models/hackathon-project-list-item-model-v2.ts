import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategory, ProjectCategoryInterface } from "../../project-category/models/project-category-model";

export type HackathonProjectListItemResponseV2 = components["schemas"]["ProjectShortResponseV2"];

export interface HackathonProjectListItemInterfaceV2 extends HackathonProjectListItemResponseV2 {
  categories: ProjectCategoryInterface[];
}

export class HackathonProjectListItemV2 implements HackathonProjectListItemInterfaceV2 {
  id!: HackathonProjectListItemResponseV2["id"];
  slug!: HackathonProjectListItemResponseV2["slug"];
  name!: HackathonProjectListItemResponseV2["name"];
  shortDescription!: HackathonProjectListItemResponseV2["shortDescription"];
  contributorCount!: HackathonProjectListItemResponseV2["contributorCount"];
  starCount!: HackathonProjectListItemResponseV2["starCount"];
  forkCount!: HackathonProjectListItemResponseV2["forkCount"];
  availableIssueCount!: HackathonProjectListItemResponseV2["availableIssueCount"];
  goodFirstIssueCount!: HackathonProjectListItemResponseV2["goodFirstIssueCount"];
  categories!: ProjectCategoryInterface[];
  languages!: HackathonProjectListItemResponseV2["languages"];
  logoUrl!: HackathonProjectListItemResponseV2["logoUrl"];
  ecosystems!: HackathonProjectListItemResponseV2["ecosystems"];
  odHackStats!: HackathonProjectListItemResponseV2["odHackStats"];
  contributorStats!: HackathonProjectListItemResponseV2["contributorStats"];

  constructor(props: HackathonProjectListItemResponseV2) {
    Object.assign(this, props);
    this.categories = (props.categories || []).map(category => new ProjectCategory(category));
  }
}

import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type MeProjectProjectListItemResponse = components["schemas"]["MyProjectsPageItemResponse"];

export interface MeProjectListItemInterface extends MeProjectProjectListItemResponse {}

export class MeProjectListItem implements MeProjectListItemInterface {
  contributorCount!: MeProjectProjectListItemResponse["contributorCount"];
  id!: MeProjectProjectListItemResponse["id"];
  languages!: MeProjectProjectListItemResponse["languages"];
  leads!: MeProjectProjectListItemResponse["leads"];
  logoUrl!: MeProjectProjectListItemResponse["logoUrl"];
  name!: MeProjectProjectListItemResponse["name"];
  shortDescription!: MeProjectProjectListItemResponse["shortDescription"];
  slug!: MeProjectProjectListItemResponse["slug"];
  totalAvailable!: MeProjectProjectListItemResponse["totalAvailable"];
  totalGranted!: MeProjectProjectListItemResponse["totalGranted"];
  totalRewarded!: MeProjectProjectListItemResponse["totalRewarded"];
  visibility!: MeProjectProjectListItemResponse["visibility"];

  constructor(props: MeProjectProjectListItemResponse) {
    Object.assign(this, props);
  }
}

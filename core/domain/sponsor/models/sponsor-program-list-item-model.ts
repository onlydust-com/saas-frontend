import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type SponsorProgramsListItemResponse = components["schemas"]["SponsorProgramPageItemResponse"];

export interface SponsorProgramsListItemInterface extends SponsorProgramsListItemResponse {}

export class SponsorProgramsListItem implements SponsorProgramsListItemInterface {
  id!: SponsorProgramsListItemResponse["id"];
  leads!: SponsorProgramsListItemResponse["leads"];
  logoUrl!: SponsorProgramsListItemResponse["logoUrl"];
  name!: SponsorProgramsListItemResponse["name"];
  projectCount!: SponsorProgramsListItemResponse["projectCount"];
  totalAvailable!: SponsorProgramsListItemResponse["totalAvailable"];
  totalGranted!: SponsorProgramsListItemResponse["totalGranted"];
  totalReceived!: SponsorProgramsListItemResponse["totalReceived"];

  constructor(props: SponsorProgramsListItemResponse) {
    Object.assign(this, props);
  }
}

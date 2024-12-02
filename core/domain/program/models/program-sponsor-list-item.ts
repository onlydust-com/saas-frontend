import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProgramSponsorListItemResponse = components["schemas"]["ProgramSponsorPageItemResponse"];

export interface ProgramSponsorListItemInterface extends ProgramSponsorListItemResponse {}

export class ProgramSponsorListItem implements ProgramSponsorListItemInterface {
  id!: ProgramSponsorListItemResponse["id"];
  leads!: ProgramSponsorListItemResponse["leads"];
  logoUrl!: ProgramSponsorListItemResponse["logoUrl"];
  name!: ProgramSponsorListItemResponse["name"];
  totalAllocated!: ProgramSponsorListItemResponse["totalAllocated"];
  totalAvailable!: ProgramSponsorListItemResponse["totalAvailable"];
  totalGranted!: ProgramSponsorListItemResponse["totalGranted"];

  constructor(props: ProgramSponsorListItemResponse) {
    Object.assign(this, props);
  }
}

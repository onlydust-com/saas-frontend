import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProgramListItemResponse = components["schemas"]["ProgramPageItemResponse"];

export interface ProgramListItemInterface extends ProgramListItemResponse {}

export class ProgramListItem implements ProgramListItemInterface {
  id!: ProgramListItemResponse["id"];
  leads!: ProgramListItemResponse["leads"];
  name!: ProgramListItemResponse["name"];
  projectCount!: ProgramListItemResponse["projectCount"];
  totalAvailable!: ProgramListItemResponse["totalAvailable"];
  totalGranted!: ProgramListItemResponse["totalGranted"];
  totalRewarded!: ProgramListItemResponse["totalRewarded"];

  constructor(props: ProgramListItemResponse) {
    Object.assign(this, props);
  }
}

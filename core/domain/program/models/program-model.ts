import { ProgramListItem } from "@/core/domain/program/models/program-list-item-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProgramResponse = components["schemas"]["ProgramResponse"];

export interface ProgramInterface extends ProgramResponse {}

export class Program extends ProgramListItem implements ProgramInterface {
  totalAvailable!: ProgramResponse["totalAvailable"];
  totalGranted!: ProgramResponse["totalGranted"];
  totalRewarded!: ProgramResponse["totalRewarded"];

  constructor(props: ProgramResponse) {
    super(props);
    Object.assign(this, props);
  }
}

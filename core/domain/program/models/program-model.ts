import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProgramResponse = components["schemas"]["ProgramResponse"];

export interface ProgramInterface extends ProgramResponse {}

export class Program implements ProgramInterface {
  id!: ProgramResponse["id"];
  name!: ProgramResponse["name"];
  totalAvailable!: ProgramResponse["totalAvailable"];
  totalGranted!: ProgramResponse["totalGranted"];
  totalRewarded!: ProgramResponse["totalRewarded"];

  constructor(props: ProgramResponse) {
    Object.assign(this, props);
  }
}

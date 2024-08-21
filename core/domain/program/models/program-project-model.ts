import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProgramProjectResponse = components["schemas"]["ProgramProjectResponse"];

export interface ProgramProjectInterface extends ProgramProjectResponse {}

export class ProgramProject implements ProgramProjectInterface {
  id!: ProgramProjectResponse["id"];
  logoUrl!: ProgramProjectResponse["logoUrl"];
  name!: ProgramProjectResponse["name"];
  slug!: ProgramProjectResponse["slug"];
  totalAvailable!: ProgramProjectResponse["totalAvailable"];
  totalGranted!: ProgramProjectResponse["totalGranted"];
  totalRewarded!: ProgramProjectResponse["totalRewarded"];

  constructor(props: ProgramProjectResponse) {
    Object.assign(this, props);
  }
}

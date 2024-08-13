import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProgramResponse = components["schemas"]["ProgramShortResponse"];

export interface ProgramListItemInterface extends ProgramResponse {}

export class ProgramListItem implements ProgramListItemInterface {
  id!: ProgramResponse["id"];
  name!: ProgramResponse["name"];

  constructor(props: ProgramResponse) {
    Object.assign(this, props);
  }
}

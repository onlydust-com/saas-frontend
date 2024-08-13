import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProgramListItemResponse = components["schemas"]["ProgramShortResponse"];

export interface ProgramListItemInterface extends ProgramListItemResponse {}

export class ProgramListItem implements ProgramListItemInterface {
  id!: ProgramListItemResponse["id"];
  name!: ProgramListItemResponse["name"];

  constructor(props: ProgramListItemResponse) {
    Object.assign(this, props);
  }
}

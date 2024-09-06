import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProgramShortResponse = components["schemas"]["ProgramShortResponse"];

export interface ProgramShortInterface extends ProgramShortResponse {}

export class ProgramShort implements ProgramShortInterface {
  id!: ProgramShortResponse["id"];
  logoUrl!: ProgramShortResponse["logoUrl"];
  name!: ProgramShortResponse["name"];
  url!: ProgramShortResponse["url"];

  constructor(props: ProgramShortResponse) {
    Object.assign(this, props);
  }
}

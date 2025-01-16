import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProjectLinkWithDescriptionResponse = components["schemas"]["ProjectLinkWithDescriptionResponse"];

export interface ProjectLinkWithDescriptionInterface extends ProjectLinkWithDescriptionResponse {}

export class ProjectLinkWithDescription implements ProjectLinkWithDescriptionInterface {
  shortDescription!: ProjectLinkWithDescriptionResponse["shortDescription"];
  id!: ProjectLinkWithDescriptionResponse["id"];
  logoUrl!: ProjectLinkWithDescriptionResponse["logoUrl"];
  name!: ProjectLinkWithDescriptionResponse["name"];
  slug!: ProjectLinkWithDescriptionResponse["slug"];

  constructor(props: ProjectLinkWithDescriptionResponse) {
    Object.assign(this, props);
  }
}

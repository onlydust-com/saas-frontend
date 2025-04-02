import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ApplicationListItemResponse = components["schemas"]["ProjectApplicationPageItemResponse"];

export interface ApplicationListItemInterface extends ApplicationListItemResponse {}

export class ApplicationListItem implements ApplicationListItemInterface {
  id!: ApplicationListItemResponse["id"];
  project!: ApplicationListItemResponse["project"];
  issue!: ApplicationListItemResponse["issue"];
  applicant!: ApplicationListItemResponse["applicant"];
  receivedAt!: ApplicationListItemResponse["receivedAt"];

  constructor(props: ApplicationListItemResponse) {
    Object.assign(this, props);
  }
}

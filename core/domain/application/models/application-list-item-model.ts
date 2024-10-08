import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ApplicationListItemResponse = components["schemas"]["ProjectApplicationPageItemResponse"];

export interface ApplicationListItemInterface extends ApplicationListItemResponse {}

export class ApplicationListItem implements ApplicationListItemInterface {
  applicant!: ApplicationListItemResponse["applicant"];
  id!: ApplicationListItemResponse["id"];
  isApplicantProjectMember!: ApplicationListItemResponse["isApplicantProjectMember"];
  issue!: ApplicationListItemResponse["issue"];
  project!: ApplicationListItemResponse["project"];
  receivedAt!: ApplicationListItemResponse["receivedAt"];
  status!: ApplicationListItemResponse["status"];

  constructor(props: ApplicationListItemResponse) {
    Object.assign(this, props);
  }
}

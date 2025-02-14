import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MeNotificationForProjectResponse = components["schemas"]["NotificationSettingsForProjectResponse"];

export interface MeNotificationForProjectInterface extends MeNotificationForProjectResponse {}

class MeNotificationForProject implements MeNotificationForProjectInterface {
  id!: MeNotificationForProjectResponse["id"];
  logoUrl!: MeNotificationForProjectResponse["logoUrl"];
  name!: MeNotificationForProjectResponse["name"];
  onGoodFirstIssueAdded!: MeNotificationForProjectResponse["onGoodFirstIssueAdded"];
  slug!: MeNotificationForProjectResponse["slug"];

  constructor(props: MeNotificationForProjectResponse) {
    Object.assign(this, props);
  }
}

export { MeNotificationForProject };

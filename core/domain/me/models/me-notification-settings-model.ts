import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { MeNotificationCategories, MeNotificationChannels } from "./me.types";

type MeNotificationSettingsResponse = components["schemas"]["NotificationSettingsResponse"];

export interface MeNotificationSettingsInterface extends MeNotificationSettingsResponse {
  findCategory(category: MeNotificationCategories): {
    [MeNotificationChannels.EMAIL]: boolean;
    [MeNotificationChannels.SUMMARY_EMAIL]: boolean;
  };
}

export class MeNotificationSettings implements MeNotificationSettingsInterface {
  notificationSettings!: MeNotificationSettingsResponse["notificationSettings"];

  constructor(props: MeNotificationSettingsResponse) {
    Object.assign(this, props);
  }

  findCategory(category: MeNotificationCategories) {
    const cat = this.notificationSettings.find(setting => setting.category === category);

    return {
      [MeNotificationChannels.EMAIL]: cat?.channels.includes(MeNotificationChannels.EMAIL) || false,
      [MeNotificationChannels.SUMMARY_EMAIL]: cat?.channels.includes(MeNotificationChannels.SUMMARY_EMAIL) || false,
    };
  }
}

import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { MeNotificationCategory, MeNotificationChannel } from "./me.types";

type MeNotificationSettingsResponse = components["schemas"]["NotificationSettingsResponse"];

export interface MeNotificationSettingsInterface extends MeNotificationSettingsResponse {
  findCategory(category: MeNotificationCategory): {
    [MeNotificationChannel.EMAIL]: boolean;
    [MeNotificationChannel.SUMMARY_EMAIL]: boolean;
  };
}

export class MeNotificationSettings implements MeNotificationSettingsInterface {
  notificationSettings!: MeNotificationSettingsResponse["notificationSettings"];

  constructor(props: MeNotificationSettingsResponse) {
    Object.assign(this, props);
  }

  findCategory(category: MeNotificationCategory) {
    const cat = this.notificationSettings.find(setting => setting.category === category);

    return {
      [MeNotificationChannel.EMAIL]: cat?.channels.includes(MeNotificationChannel.EMAIL) || false,
      [MeNotificationChannel.SUMMARY_EMAIL]: cat?.channels.includes(MeNotificationChannel.SUMMARY_EMAIL) || false,
    };
  }
}

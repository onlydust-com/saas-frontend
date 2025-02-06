import { MeNotificationSettingsChannel } from "@/core/domain/me/me-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { MeNotificationSettingsCategoryType } from "./me.types";

type MeNotificationSettingsResponse = components["schemas"]["NotificationSettingsResponse"];

export interface MeNotificationSettingsInterface extends MeNotificationSettingsResponse {
  findCategory(category: MeNotificationSettingsCategoryType): {
    [MeNotificationSettingsChannel.EMAIL]: boolean;
    [MeNotificationSettingsChannel.SUMMARY_EMAIL]: boolean;
  };
}

export class MeNotificationSettings implements MeNotificationSettingsInterface {
  notificationSettings!: MeNotificationSettingsResponse["notificationSettings"];

  constructor(props: MeNotificationSettingsResponse) {
    Object.assign(this, props);
  }

  findCategory(category: MeNotificationSettingsCategoryType) {
    const cat = this.notificationSettings.find(setting => setting.category === category);

    return {
      [MeNotificationSettingsChannel.EMAIL]: cat?.channels.includes(MeNotificationSettingsChannel.EMAIL) || false,
      [MeNotificationSettingsChannel.SUMMARY_EMAIL]:
        cat?.channels.includes(MeNotificationSettingsChannel.SUMMARY_EMAIL) || false,
    };
  }
}

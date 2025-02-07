import { MeNotificationSettingsCategory, MeNotificationSettingsChannel } from "@/core/domain/me/me-constants";
import { SetMyNotificationSettingsBody } from "@/core/domain/me/me-contract.types";
import { MeNotificationSettingsInterface } from "@/core/domain/me/models/me-notification-settings-model";

import { FormData } from "./notifications-form.types";

export function formatToData(notificationSettings: MeNotificationSettingsInterface): FormData {
  return {
    notificationSettings: {
      [MeNotificationSettingsCategory.MAINTAINER_PROJECT_CONTRIBUTOR]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.MAINTAINER_PROJECT_CONTRIBUTOR
      ),
      [MeNotificationSettingsCategory.MAINTAINER_PROJECT_PROGRAM]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.MAINTAINER_PROJECT_PROGRAM
      ),
      [MeNotificationSettingsCategory.CONTRIBUTOR_REWARD]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.CONTRIBUTOR_REWARD
      ),
      [MeNotificationSettingsCategory.CONTRIBUTOR_PROJECT]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.CONTRIBUTOR_PROJECT
      ),
      [MeNotificationSettingsCategory.GLOBAL_BILLING_PROFILE]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.GLOBAL_BILLING_PROFILE
      ),
      [MeNotificationSettingsCategory.GLOBAL_MARKETING]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.GLOBAL_MARKETING
      ),
      [MeNotificationSettingsCategory.SPONSOR_LEAD]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.SPONSOR_LEAD
      ),
      [MeNotificationSettingsCategory.PROGRAM_LEAD]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.PROGRAM_LEAD
      ),
      [MeNotificationSettingsCategory.CONTRIBUTOR_REWIND]: notificationSettings.findCategory(
        MeNotificationSettingsCategory.CONTRIBUTOR_REWIND
      ),
    },
  };
}

export function formatToSchema(data: FormData): SetMyNotificationSettingsBody {
  function findChannel(notification: FormData["notificationSettings"]["MAINTAINER_PROJECT_CONTRIBUTOR"]) {
    const channels: SetMyNotificationSettingsBody["notificationSettings"][0]["channels"] = ["IN_APP"];

    if (notification?.EMAIL) {
      channels.push(MeNotificationSettingsChannel.EMAIL);
    }

    if (notification?.SUMMARY_EMAIL) {
      channels.push(MeNotificationSettingsChannel.SUMMARY_EMAIL);
    }

    return channels;
  }

  if (data.notificationSettings) {
    return {
      notificationSettings: [
        {
          category: MeNotificationSettingsCategory.MAINTAINER_PROJECT_CONTRIBUTOR,
          channels: findChannel(data.notificationSettings.MAINTAINER_PROJECT_CONTRIBUTOR),
        },
        {
          category: MeNotificationSettingsCategory.MAINTAINER_PROJECT_PROGRAM,
          channels: findChannel(data.notificationSettings.MAINTAINER_PROJECT_PROGRAM),
        },
        {
          category: MeNotificationSettingsCategory.CONTRIBUTOR_REWARD,
          channels: findChannel(data.notificationSettings.CONTRIBUTOR_REWARD),
        },
        {
          category: MeNotificationSettingsCategory.CONTRIBUTOR_PROJECT,
          channels: findChannel(data.notificationSettings.CONTRIBUTOR_PROJECT),
        },
        {
          category: MeNotificationSettingsCategory.GLOBAL_BILLING_PROFILE,
          channels: findChannel(data.notificationSettings.GLOBAL_BILLING_PROFILE),
        },
        {
          category: MeNotificationSettingsCategory.GLOBAL_MARKETING,
          channels: findChannel(data.notificationSettings.GLOBAL_MARKETING),
        },
        {
          category: MeNotificationSettingsCategory.PROGRAM_LEAD,
          channels: findChannel(data.notificationSettings.PROGRAM_LEAD),
        },
        {
          category: MeNotificationSettingsCategory.SPONSOR_LEAD,
          channels: findChannel(data.notificationSettings.SPONSOR_LEAD),
        },
        {
          category: MeNotificationSettingsCategory.CONTRIBUTOR_REWIND,
          channels: findChannel(data.notificationSettings.CONTRIBUTOR_REWIND),
        },
      ].filter(({ channels }) => channels.length > 0) as SetMyNotificationSettingsBody["notificationSettings"],
    };
  }

  return { notificationSettings: [] };
}

import { SetMyNotificationSettingsBody } from "@/core/domain/me/me-contract.types";
import { MeNotificationSettingsInterface } from "@/core/domain/me/models/me-notification-settings-model";
import { MeNotificationCategory } from "@/core/domain/me/models/me.types";

import { FormData } from "./notifications-form.types";

export function formatToData(notificationSettings: MeNotificationSettingsInterface): FormData {
  return {
    notificationSettings: {
      [MeNotificationCategory.MAINTAINER_PROJECT_CONTRIBUTOR]: notificationSettings.findCategory(
        MeNotificationCategory.MAINTAINER_PROJECT_CONTRIBUTOR
      ),
      [MeNotificationCategory.MAINTAINER_PROJECT_PROGRAM]: notificationSettings.findCategory(
        MeNotificationCategory.MAINTAINER_PROJECT_PROGRAM
      ),
      [MeNotificationCategory.CONTRIBUTOR_REWARD]: notificationSettings.findCategory(
        MeNotificationCategory.CONTRIBUTOR_REWARD
      ),
      [MeNotificationCategory.CONTRIBUTOR_PROJECT]: notificationSettings.findCategory(
        MeNotificationCategory.CONTRIBUTOR_PROJECT
      ),
      [MeNotificationCategory.GLOBAL_BILLING_PROFILE]: notificationSettings.findCategory(
        MeNotificationCategory.GLOBAL_BILLING_PROFILE
      ),
      [MeNotificationCategory.GLOBAL_MARKETING]: notificationSettings.findCategory(
        MeNotificationCategory.GLOBAL_MARKETING
      ),
      [MeNotificationCategory.SPONSOR_LEAD]: notificationSettings.findCategory(MeNotificationCategory.SPONSOR_LEAD),
      [MeNotificationCategory.PROGRAM_LEAD]: notificationSettings.findCategory(MeNotificationCategory.PROGRAM_LEAD),
      [MeNotificationCategory.CONTRIBUTOR_REWIND]: notificationSettings.findCategory(
        MeNotificationCategory.CONTRIBUTOR_REWIND
      ),
    },
  };
}

export function formatToSchema(data: FormData): SetMyNotificationSettingsBody {
  function findChannel(notification: FormData["notificationSettings"]["MAINTAINER_PROJECT_CONTRIBUTOR"]) {
    const channels: SetMyNotificationSettingsBody["notificationSettings"][0]["channels"] = ["IN_APP"];

    if (notification?.EMAIL) {
      channels.push("EMAIL");
    }

    if (notification?.SUMMARY_EMAIL) {
      channels.push("SUMMARY_EMAIL");
    }

    return channels;
  }

  if (data.notificationSettings) {
    return {
      notificationSettings: [
        {
          category: MeNotificationCategory.MAINTAINER_PROJECT_CONTRIBUTOR,
          channels: findChannel(data.notificationSettings.MAINTAINER_PROJECT_CONTRIBUTOR),
        },
        {
          category: MeNotificationCategory.MAINTAINER_PROJECT_PROGRAM,
          channels: findChannel(data.notificationSettings.MAINTAINER_PROJECT_PROGRAM),
        },
        {
          category: MeNotificationCategory.CONTRIBUTOR_REWARD,
          channels: findChannel(data.notificationSettings.CONTRIBUTOR_REWARD),
        },
        {
          category: MeNotificationCategory.CONTRIBUTOR_PROJECT,
          channels: findChannel(data.notificationSettings.CONTRIBUTOR_PROJECT),
        },
        {
          category: MeNotificationCategory.GLOBAL_BILLING_PROFILE,
          channels: findChannel(data.notificationSettings.GLOBAL_BILLING_PROFILE),
        },
        {
          category: MeNotificationCategory.GLOBAL_MARKETING,
          channels: findChannel(data.notificationSettings.GLOBAL_MARKETING),
        },
        {
          category: MeNotificationCategory.PROGRAM_LEAD,
          channels: findChannel(data.notificationSettings.PROGRAM_LEAD),
        },
        {
          category: MeNotificationCategory.SPONSOR_LEAD,
          channels: findChannel(data.notificationSettings.SPONSOR_LEAD),
        },
        {
          category: MeNotificationCategory.CONTRIBUTOR_REWIND,
          channels: findChannel(data.notificationSettings.CONTRIBUTOR_REWIND),
        },
      ].filter(({ channels }) => channels.length > 0) as SetMyNotificationSettingsBody["notificationSettings"],
    };
  }

  return { notificationSettings: [] };
}

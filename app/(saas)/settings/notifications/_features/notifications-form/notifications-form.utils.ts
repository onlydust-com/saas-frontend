import { MeNotificationSettingsInterface } from "@/core/domain/me/models/me-notification-settings-model";
import { MeNotificationCategories } from "@/core/domain/me/models/me.types";

import { FormData } from "./notifications-form.types";

export function formatToData(notificationSettings: MeNotificationSettingsInterface): FormData {
  return {
    [MeNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR]: notificationSettings.findCategory(
      MeNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR
    ),
    [MeNotificationCategories.MAINTAINER_PROJECT_PROGRAM]: notificationSettings.findCategory(
      MeNotificationCategories.MAINTAINER_PROJECT_PROGRAM
    ),
    [MeNotificationCategories.CONTRIBUTOR_REWARD]: notificationSettings.findCategory(
      MeNotificationCategories.CONTRIBUTOR_REWARD
    ),
    [MeNotificationCategories.CONTRIBUTOR_PROJECT]: notificationSettings.findCategory(
      MeNotificationCategories.CONTRIBUTOR_PROJECT
    ),
    [MeNotificationCategories.GLOBAL_BILLING_PROFILE]: notificationSettings.findCategory(
      MeNotificationCategories.GLOBAL_BILLING_PROFILE
    ),
    [MeNotificationCategories.GLOBAL_MARKETING]: notificationSettings.findCategory(
      MeNotificationCategories.GLOBAL_MARKETING
    ),
    [MeNotificationCategories.SPONSOR_LEAD]: notificationSettings.findCategory(MeNotificationCategories.SPONSOR_LEAD),
    [MeNotificationCategories.PROGRAM_LEAD]: notificationSettings.findCategory(MeNotificationCategories.PROGRAM_LEAD),
    [MeNotificationCategories.CONTRIBUTOR_REWIND]: notificationSettings.findCategory(
      MeNotificationCategories.CONTRIBUTOR_REWIND
    ),
  };
}

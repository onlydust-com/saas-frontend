import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type UserJoiningReason = components["schemas"]["UserProfileUpdateRequest"]["joiningReason"];

export type MeNotificationSettingsChannelType = Exclude<
  components["schemas"]["NotificationSettingsResponse"]["notificationSettings"][0]["channels"][0],
  "IN_APP"
>;

export type MeNotificationSettingsCategoryType =
  components["schemas"]["NotificationSettingsResponse"]["notificationSettings"][0]["category"];

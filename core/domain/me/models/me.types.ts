import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type UserJoiningReason = components["schemas"]["UserProfileUpdateRequest"]["joiningReason"];

export type MeNotificationSettingsChannelType = Exclude<
  components["schemas"]["NotificationSettingsResponse"]["notificationSettings"][0]["channels"][0],
  "IN_APP"
>;

export type MeNotificationSettingsCategoryType =
  components["schemas"]["NotificationSettingsResponse"]["notificationSettings"][0]["category"];

export enum MeNotificationCategories {
  MAINTAINER_PROJECT_CONTRIBUTOR = "MAINTAINER_PROJECT_CONTRIBUTOR",
  MAINTAINER_PROJECT_PROGRAM = "MAINTAINER_PROJECT_PROGRAM",
  CONTRIBUTOR_REWARD = "CONTRIBUTOR_REWARD",
  CONTRIBUTOR_PROJECT = "CONTRIBUTOR_PROJECT",
  GLOBAL_BILLING_PROFILE = "GLOBAL_BILLING_PROFILE",
  GLOBAL_MARKETING = "GLOBAL_MARKETING",
  PROGRAM_LEAD = "PROGRAM_LEAD",
  SPONSOR_LEAD = "SPONSOR_LEAD",
  CONTRIBUTOR_REWIND = "CONTRIBUTOR_REWIND",
}

export enum MeNotificationChannels {
  EMAIL = "EMAIL",
  SUMMARY_EMAIL = "SUMMARY_EMAIL",
  IN_APP = "IN_APP",
}

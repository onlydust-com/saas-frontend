import { z } from "zod";

import { MeNotificationCategories, MeNotificationChannels } from "@/core/domain/me/models/me.types";

const channels = z.object({
  [MeNotificationChannels.EMAIL]: z.boolean(),
  [MeNotificationChannels.SUMMARY_EMAIL]: z.boolean(),
});

export const formSchema = z.object({
  [MeNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR]: channels,
  [MeNotificationCategories.MAINTAINER_PROJECT_PROGRAM]: channels,
  [MeNotificationCategories.CONTRIBUTOR_REWARD]: channels,
  [MeNotificationCategories.CONTRIBUTOR_PROJECT]: channels,
  [MeNotificationCategories.GLOBAL_BILLING_PROFILE]: channels,
  [MeNotificationCategories.GLOBAL_MARKETING]: channels,
  [MeNotificationCategories.SPONSOR_LEAD]: channels,
  [MeNotificationCategories.PROGRAM_LEAD]: channels,
  [MeNotificationCategories.CONTRIBUTOR_REWIND]: channels,
});

export type FormData = z.infer<typeof formSchema>;

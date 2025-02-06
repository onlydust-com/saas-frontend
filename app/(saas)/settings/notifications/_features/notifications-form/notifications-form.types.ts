import { z } from "zod";

import { MeNotificationCategory, MeNotificationChannel } from "@/core/domain/me/models/me.types";

const channels = z.object({
  [MeNotificationChannel.EMAIL]: z.boolean(),
  [MeNotificationChannel.SUMMARY_EMAIL]: z.boolean(),
});

export const formSchema = z.object({
  // notificationSettings: z.object({
  //   [MeNotificationCategory.MAINTAINER_PROJECT_CONTRIBUTOR]: channels,
  //   [MeNotificationCategory.MAINTAINER_PROJECT_PROGRAM]: channels,
  //   [MeNotificationCategory.CONTRIBUTOR_REWARD]: channels,
  //   [MeNotificationCategory.CONTRIBUTOR_PROJECT]: channels,
  //   [MeNotificationCategory.GLOBAL_BILLING_PROFILE]: channels,
  //   [MeNotificationCategory.GLOBAL_MARKETING]: channels,
  //   [MeNotificationCategory.SPONSOR_LEAD]: channels,
  //   [MeNotificationCategory.PROGRAM_LEAD]: channels,
  //   [MeNotificationCategory.CONTRIBUTOR_REWIND]: channels,
  // }),
  notificationSettings: z.record(z.nativeEnum(MeNotificationCategory), channels),
});

export type FormData = z.infer<typeof formSchema>;

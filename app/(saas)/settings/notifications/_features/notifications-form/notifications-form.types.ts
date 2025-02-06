import { z } from "zod";

import { MeNotificationSettingsCategory, MeNotificationSettingsChannel } from "@/core/domain/me/me-constants";

export const formSchema = z.object({
  notificationSettings: z.record(
    z.nativeEnum(MeNotificationSettingsCategory),
    z.object({
      [MeNotificationSettingsChannel.EMAIL]: z.boolean(),
      [MeNotificationSettingsChannel.SUMMARY_EMAIL]: z.boolean(),
    })
  ),
});

export type FormData = z.infer<typeof formSchema>;

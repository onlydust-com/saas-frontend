import { z } from "zod";

import { ALLOCATED_TIME, REGEX, keys } from "./form.utils";

export const formSchema = z.object({
  avatarUrl: z.string().url().optional(),
  contactEmail: z.string().email().min(1),
  location: z.string().optional(),
  bio: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  website: z.union([z.string().regex(REGEX.website, keys.invalidUrl), z.string().length(0)]).optional(),
  telegram: z.object({
    contact: z.string().regex(REGEX.telegram, keys.invalidUsername).optional(),
    isPublic: z.boolean(),
  }),
  whatsapp: z.object({
    contact: z.string().regex(REGEX.whatsapp, keys.invalidPhoneNumber).optional(),
    isPublic: z.boolean(),
  }),
  twitter: z.object({
    contact: z.string().regex(REGEX.twitter, keys.invalidUsername).optional(),
    isPublic: z.boolean(),
  }),
  discord: z.object({
    contact: z.string().regex(REGEX.discord, keys.invalidUsername).optional(),
    isPublic: z.boolean(),
  }),
  linkedin: z.object({
    contact: z.string().regex(REGEX.linkedin, keys.invalidUsername).optional(),
    isPublic: z.boolean(),
  }),
  weeklyAllocatedTime: z.nativeEnum(ALLOCATED_TIME),
  lookingForAJob: z.boolean(),
  notifications: z.any(),
});

import { z } from "zod";

import { REGEX, keys } from "./form.utils";

export const formSchema = z.object({
  avatarUrl: z.string().url().optional().or(z.literal("")),
  avatarFile: z
    .custom<File>(file => file instanceof File, "Must be a valid file")
    .refine(
      file => (file ? ["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(file.type) : true),
      "File must be JPEG, PNG, GIF, or SVG"
    )
    .optional(),
  location: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  firstName: z.string().optional().or(z.literal("")),
  lastName: z.string().optional().or(z.literal("")),
  website: z.string().regex(REGEX.website, keys.invalidUrl).optional().or(z.literal("")),
  telegram: z.object({
    contact: z.string().regex(REGEX.telegram, keys.invalidUsername).optional().or(z.literal("")),
    isPublic: z.boolean(),
  }),
  whatsapp: z.object({
    contact: z.string().regex(REGEX.whatsapp, keys.invalidPhoneNumber).optional().or(z.literal("")),
    isPublic: z.boolean(),
  }),
  twitter: z.object({
    contact: z.string().regex(REGEX.twitter, keys.invalidUsername).optional().or(z.literal("")),
    isPublic: z.boolean(),
  }),
  discord: z.object({
    contact: z.string().regex(REGEX.discord, keys.invalidUsername).optional().or(z.literal("")),
    isPublic: z.boolean(),
  }),
  linkedin: z.object({
    contact: z.string().regex(REGEX.linkedin, keys.invalidUsername).optional().or(z.literal("")),
    isPublic: z.boolean(),
  }),
});

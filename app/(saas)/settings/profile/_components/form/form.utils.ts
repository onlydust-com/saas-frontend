import { MeProfileInterface } from "@/core/domain/me/models/me-profile-model";
import { UserProfileContactChannel } from "@/core/domain/user/models/user.types";

export const REGEX = {
  website: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  telegram: /^(?:@|(?:(?:(?:https?:\/\/)?t(?:elegram)?)\.me\/))?(\w*)$/,
  whatsapp: /^\+?(?:[0-9-(). ])*$/,
  twitter: /^(?:@|(?:(?:(?:https?:\/\/)?(?:twitter\.com|x\.com)\/))?)(\w*)$/,
  discord: /^@?[a-zA-Z0-9_.]*$/,
  linkedin: /^(?:@|(?:(?:(?:https?:)?\/\/)?(?:[\w]+\.)?linkedin\.com\/in\/))?([\w\-_À-ÿ%]*)\/?$/,
};

export enum ALLOCATED_TIME {
  NONE = "NONE",
  LESS_THAN_ONE_DAY = "LESS_THAN_ONE_DAY",
  ONE_TO_THREE_DAYS = "ONE_TO_THREE_DAYS",
  GREATER_THAN_THREE_DAYS = "GREATER_THAN_THREE_DAYS",
}

const INVALID_URL = "invalidUrl";
const INVALID_USERNAME = "invalidUsername";
const INVALID_PHONE_NUMBER = "invalidPhoneNumber";

type KeyType = typeof INVALID_URL | typeof INVALID_USERNAME | typeof INVALID_PHONE_NUMBER;

export const keys: Record<KeyType, string> = {
  [INVALID_URL]: "Invalid URL",
  [INVALID_USERNAME]: "Invalid username",
  [INVALID_PHONE_NUMBER]: "Invalid phone number",
};

export function formatData(data: MeProfileInterface) {
  return {
    avatarUrl: data.avatarUrl ?? "",
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    location: data.location ?? "",
    bio: data.bio ?? "",
    website: data.website ?? "",
    weeklyAllocatedTime: data.allocatedTimeToContribute as ALLOCATED_TIME,
    lookingForAJob: data.isLookingForAJob ?? false,
    telegram: data.getContactTelegram() ?? undefined,
    whatsapp: data.getContact(UserProfileContactChannel.whatsapp) ?? undefined,
    twitter: data.getContact(UserProfileContactChannel.twitter) ?? undefined,
    discord: data.getContact(UserProfileContactChannel.discord) ?? undefined,
    linkedin: data.getContact(UserProfileContactChannel.linkedin) ?? undefined,
  };
}

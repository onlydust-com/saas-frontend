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

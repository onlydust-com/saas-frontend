import { LucideIcon } from "lucide-react";

export enum SocialPlatformChannels {
  TELEGRAM = "TELEGRAM",
  DISCORD = "DISCORD",
  TWITTER = "TWITTER",
  GITHUB = "GITHUB",
  LINKEDIN = "LINKEDIN",
  WHATSAPP = "WHATSAPP",
  WEB = "WEB",
}

export type SocialPlatformChannelsUnion = `${SocialPlatformChannels}`;

export interface Social {
  url?: string[];
  icon: LucideIcon;
  label: string;
}

export interface Contact {
  channel: SocialPlatformChannelsUnion;
  contact: string;
  visibility: "public" | "private";
}

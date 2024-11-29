import { Social, SocialPlatformChannelsUnion } from "@/core/kernel/social/social.types";

export interface SocialFacadePort {
  getSocialPlatformByChannel: (socialPlatformChannel: SocialPlatformChannelsUnion) => Social;
  getSocialPlatformByUrl: (url: string) => Social;
}

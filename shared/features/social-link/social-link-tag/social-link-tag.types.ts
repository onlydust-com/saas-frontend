import { UserProfileContactChannel } from "@/core/domain/user/models/user.types";

export interface SocialLinkTagProps {
  url: string;
  value?: string;
  channel?: `${UserProfileContactChannel}`;
}

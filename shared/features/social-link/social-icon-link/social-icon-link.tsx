import { Icon } from "@/design-system/atoms/icon";

import { SOCIAL_PLATFORM } from "@/shared/constants/social-platform";
import { useSocialPlatform } from "@/shared/hooks/social-platform/use-social-platform";

import { SocialIconLinkProps } from "./social-icon-link.types";

export function SocialIconLink({ url }: SocialIconLinkProps) {
  const platform = useSocialPlatform(url);
  console.log("platform", platform);
  switch (platform) {
    case SOCIAL_PLATFORM.DISCORD:
      return <Icon name="ri-discord-fill" />;
    case SOCIAL_PLATFORM.TELEGRAM:
      return <Icon name="ri-telegram-2-fill" />;
    case SOCIAL_PLATFORM.TWITTER:
      return <Icon name="ri-twitter-x-fill" />;
    case SOCIAL_PLATFORM.GITHUB:
      return <Icon name="ri-github-fill" />;
    case SOCIAL_PLATFORM.LINKEDIN:
      return <Icon name="ri-linkedin-box-fill" />;
    case SOCIAL_PLATFORM.WHATSAPP:
      return <Icon name="ri-whatsapp-fill" />;
    default:
      return <Icon name="ri-link" />;
  }
}

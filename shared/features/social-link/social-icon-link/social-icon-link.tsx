import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";

import { SOCIAL_PLATFORM } from "@/shared/constants/social-platform";
import { useSocialPlatform } from "@/shared/hooks/social-platform/use-social-platform";

import { SocialIconLinkProps } from "./social-icon-link.types";

export function SocialIconLink({ url }: SocialIconLinkProps) {
  const platform = useSocialPlatform(url);

  switch (platform) {
    case SOCIAL_PLATFORM.DISCORD:
      return <RemixIcon name="ri-discord-fill" />;
    case SOCIAL_PLATFORM.TELEGRAM:
      return <RemixIcon name="ri-telegram-2-fill" />;
    case SOCIAL_PLATFORM.TWITTER:
      return <RemixIcon name="ri-twitter-x-fill" />;
    case SOCIAL_PLATFORM.GITHUB:
      return <RemixIcon name="ri-github-fill" />;
    case SOCIAL_PLATFORM.LINKEDIN:
      return <RemixIcon name="ri-linkedin-box-fill" />;
    case SOCIAL_PLATFORM.WHATSAPP:
      return <RemixIcon name="ri-whatsapp-fill" />;
    default:
      return <RemixIcon name="ri-link" />;
  }
}

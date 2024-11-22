import { Link } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";

import { SOCIAL_PLATFORM } from "@/shared/constants/social-platform";
import { SocialIconLinkProps } from "@/shared/features/social/social-icon-link/social-icon-link.types";
import { useSocialPlatform } from "@/shared/hooks/social-platform/use-social-platform";
import { Discord, Github, Linkedin, Telegram, Twitter, Whatsapp } from "@/shared/icons";

export function SocialIconLink({ url }: SocialIconLinkProps) {
  const platform = useSocialPlatform(url);

  switch (platform) {
    case SOCIAL_PLATFORM.DISCORD:
      return <Icon component={Discord} />;
    case SOCIAL_PLATFORM.TELEGRAM:
      return <Icon component={Telegram} />;
    case SOCIAL_PLATFORM.TWITTER:
      return <Icon component={Twitter} />;
    case SOCIAL_PLATFORM.GITHUB:
      return <Icon component={Github} />;
    case SOCIAL_PLATFORM.LINKEDIN:
      return <Icon component={Linkedin} />;
    case SOCIAL_PLATFORM.WHATSAPP:
      return <Icon component={Whatsapp} />;
    default:
      return <Icon component={Link} />;
  }
}

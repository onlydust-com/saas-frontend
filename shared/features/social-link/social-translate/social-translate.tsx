import { SOCIAL_PLATFORM } from "@/shared/constants/social-platform";
import { useSocialPlatform } from "@/shared/hooks/social-platform/use-social-platform";
import { Translate } from "@/shared/translation/components/translate/translate";

import { SocialTranslateProps } from "./social-translate.types";

export function SocialLinkTranslate({ url }: SocialTranslateProps) {
  const platform = useSocialPlatform(url);

  switch (platform) {
    case SOCIAL_PLATFORM.DISCORD:
      return <Translate token={"features:socialLink.DISCORD"} />;
    case SOCIAL_PLATFORM.TELEGRAM:
      return <Translate token={"features:socialLink.TELEGRAM"} />;
    case SOCIAL_PLATFORM.TWITTER:
      return <Translate token={"features:socialLink.TWITTER"} />;
    case SOCIAL_PLATFORM.GITHUB:
      return <Translate token={"features:socialLink.GITHUB"} />;
    case SOCIAL_PLATFORM.LINKEDIN:
      return <Translate token={"features:socialLink.LINKEDIN"} />;
    case SOCIAL_PLATFORM.WHATSAPP:
      return <Translate token={"features:socialLink.WHATSAPP"} />;
    default:
      return <Translate token={"features:socialLink.WEB"} />;
  }
}

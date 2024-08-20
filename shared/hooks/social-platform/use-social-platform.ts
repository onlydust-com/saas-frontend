import { useMemo } from "react";

import { SOCIAL_PLATFORM } from "@/shared/constants/social-platform";

export const useSocialPlatform = (url?: string): SOCIAL_PLATFORM => {
  const platforms: { [key: string]: SOCIAL_PLATFORM } = {
    ["t.me/"]: SOCIAL_PLATFORM.TELEGRAM,
    ["discord.com/"]: SOCIAL_PLATFORM.DISCORD,
    ["x.com/"]: SOCIAL_PLATFORM.TWITTER,
    ["twitter.com/"]: SOCIAL_PLATFORM.TWITTER,
    ["github.com/"]: SOCIAL_PLATFORM.GITHUB,
    ["linkedin.com/"]: SOCIAL_PLATFORM.LINKEDIN,
    ["wa.me/"]: SOCIAL_PLATFORM.WHATSAPP,
  } as const;

  return useMemo(() => {
    if (!url) {
      return SOCIAL_PLATFORM.WEB;
    }

    const findKey = Object.keys(platforms).find(key => url.includes(key));

    if (findKey) {
      return platforms[findKey];
    }

    return SOCIAL_PLATFORM.WEB;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
};

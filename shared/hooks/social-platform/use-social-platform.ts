import { useMemo } from "react";

import { SOCIAL_PLATFORM, SOCIAL_PLATFORM_MAP } from "@/shared/constants/social-platform";

export const useSocialPlatform = (url?: string): SOCIAL_PLATFORM => {
  return useMemo(() => {
    if (!url) {
      return SOCIAL_PLATFORM.WEB;
    }

    const findKey = Object.keys(SOCIAL_PLATFORM_MAP).find(key => url.includes(key));

    if (findKey) {
      return SOCIAL_PLATFORM_MAP[findKey];
    }

    return SOCIAL_PLATFORM.WEB;
  }, [url]);
};

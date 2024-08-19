import { useMemo } from "react";

import { Icon } from "@/design-system/atoms/icon";

import { TSocialIconLink } from "./social-icon-link.types";

export function SocialIconLink({ url }: TSocialIconLink.Props) {
  const socialIcons = {
    ["t.me/"]: <Icon name="ri-telegram-2-fill" />,
    ["discord.com/"]: <Icon name="ri-discord-fill" />,
    ["x.com/"]: <Icon name="ri-twitter-x-fill" />,
    ["twitter.com/"]: <Icon name="ri-twitter-x-fill" />,
    ["github.com/"]: <Icon name="ri-github-fill" />,
    ["linkedin.com/"]: <Icon name="ri-linkedin-box-fill" />,
    ["wa.me/"]: <Icon name="ri-whatsapp-fill" />,
  };

  const key = useMemo(() => {
    return Object.keys(socialIcons).find(key => url.includes(key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return key ? socialIcons[key as keyof typeof socialIcons] : <Icon name="ri-link" />;
}

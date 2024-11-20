import copy from "copy-to-clipboard";
import { useMemo } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { toast } from "@/design-system/molecules/toaster";

import { SOCIAL_PLATFORM } from "@/shared/constants/social-platform";
import { Discord, Whatsapp } from "@/shared/icons";
import { Translate } from "@/shared/translation/components/translate/translate";

import { SocialIconLink } from "../social-icon-link/social-icon-link";
import { SocialLinkTagProps } from "./social-link-tag.types";

export function SocialLinkTag({ url, value, channel }: SocialLinkTagProps) {
  function handleCopy() {
    copy(url);
    toast.success(<Translate token={"features:socialLink.toast.copied"} />);
  }

  const args = useMemo(() => {
    if (channel === SOCIAL_PLATFORM.WHATSAPP) {
      return {
        onClick: handleCopy,
        startContent: <Icon component={Whatsapp} />,
      };
    }

    if (channel === SOCIAL_PLATFORM.DISCORD) {
      return {
        onClick: handleCopy,
        startContent: <Icon component={Discord} />,
      };
    }

    return {
      htmlProps: { href: url },
      startContent: <SocialIconLink url={url} />,
    };
  }, [channel, url]);

  if (!value && !url) return null;

  return (
    <Button as={"a"} variant={"secondary"} size={"sm"} {...args}>
      {value}
    </Button>
  );
}

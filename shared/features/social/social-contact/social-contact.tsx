import copy from "copy-to-clipboard";
import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { toast } from "@/design-system/molecules/toaster";

import { SocialContactProps } from "@/shared/features/social/social-contact/social-contact.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function SocialContact({ contact, buttonProps }: SocialContactProps) {
  const socialKernelPort = bootstrap.getSocialKernelPort();

  function handleCopy(url: string) {
    copy(url);
    toast.success(<Translate token={"features:socialLink.toast.copied"} />);
  }

  const { icon, url } = socialKernelPort.getSocialPlatformByChannel(contact.channel);

  const args = useMemo(() => {
    if (url) {
      return {
        as: "a",
        htmlProps: { href: contact.contact, target: "_blank" },
      };
    }

    return {
      onClick: () => handleCopy(contact.contact),
    };
  }, [url]);

  return (
    <Button variant={"secondary"} size={"sm"} startContent={<Icon component={icon} />} {...buttonProps} {...args} />
  );
}

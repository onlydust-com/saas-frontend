import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";

import { ProjectMoreInfoProps } from "@/shared/features/social/project-more-info/project-more-info.types";

export function ProjectMoreInfo({ moreInfoItem, buttonProps }: ProjectMoreInfoProps) {
  const socialKernelPort = bootstrap.getSocialKernelPort();
  const urlKernelPort = bootstrap.getUrlKernelPort();

  const { icon, label } = socialKernelPort.getSocialPlatformByUrl(moreInfoItem.url);

  return (
    <Button
      as={"a"}
      variant={"secondary"}
      size={"sm"}
      startContent={<Icon component={icon} />}
      {...buttonProps}
      htmlProps={{ href: urlKernelPort.validateUrl(moreInfoItem.url), target: "_blank" }}
    >
      {moreInfoItem.value || label}
    </Button>
  );
}

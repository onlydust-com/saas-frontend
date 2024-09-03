import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SocialIconLink } from "../social-icon-link/social-icon-link";
import { SocialLinkTagProps } from "./social-link-tag.types";

export function SocialLinkTag({ url, value }: SocialLinkTagProps) {
  if (!value) return null;

  return (
    <Button
      as={"a"}
      htmlProps={{ href: url }}
      variant={"secondary"}
      size={"sm"}
      startContent={<SocialIconLink url={url} />}
    >
      {value}
    </Button>
  );
}

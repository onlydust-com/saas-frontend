import { Tag } from "@/design-system/atoms/tag";

import { SocialIconLink } from "../social-icon-link/social-icon-link";
import { SocialLinkTagProps } from "./social-link-tag.types";

export function SocialLinkTag({ url, value }: SocialLinkTagProps) {
  if (!value) return null;

  return (
    <Tag
      key={url}
      size={"s"}
      style={"outline"}
      color={"white"}
      as={"a"}
      htmlProps={{ href: url }}
      classNames={{ base: "max-w-full overflow-hidden" }}
      startContent={<SocialIconLink url={url} />}
    >
      {value}
    </Tag>
  );
}

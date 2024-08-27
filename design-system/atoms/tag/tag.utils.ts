import { ElementType } from "react";

import { TagAvatarPort, TagPort } from "@/design-system/atoms/tag/tag.types";

export function isTagAvatar<C extends ElementType>(tag: TagPort<C>): tag is TagAvatarPort<C> {
  return (tag as TagAvatarPort<C>).avatar !== undefined;
}

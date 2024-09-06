import { ElementType } from "react";

import { TagAvatar } from "@/design-system/atoms/tag/variants/tag-avatar";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagPort } from "../tag.types";
import { isTagAvatar } from "../tag.utils";

export function Tag<C extends ElementType = "span">(props: TagPort<C>) {
  if (isTagAvatar(props)) return <TagAvatar {...props} />;

  return withComponentAdapter<TagPort<C>>(TagDefaultAdapter)(props);
}

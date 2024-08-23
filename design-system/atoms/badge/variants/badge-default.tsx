import { ElementType } from "react";

import { BadgeDefaultAdapter } from "@/design-system/atoms/badge/adapters/default/default.adapter";
import { isBadgeAvatar, isBadgeClose, isBadgeIcon } from "@/design-system/atoms/badge/badge.utils";
import { BadgeAvatar } from "@/design-system/atoms/badge/variants/badge-avatar";
import { BadgeClose } from "@/design-system/atoms/badge/variants/badge-close";
import { BadgeIcon } from "@/design-system/atoms/badge/variants/badge-icon";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { BadgePort } from "../badge.types";

export function Badge<C extends ElementType = "span">(props: BadgePort<C>) {
  if (isBadgeAvatar(props)) return <BadgeAvatar {...props} />;

  if (isBadgeIcon(props)) return <BadgeIcon {...props} />;

  if (isBadgeClose(props)) return <BadgeClose {...props} />;

  return withComponentAdapter<BadgePort<C>>(BadgeDefaultAdapter)(props);
}

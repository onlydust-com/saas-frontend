import { ElementType } from "react";

import { BadgeAvatarPort, BadgeIconPort, BadgePort } from "@/design-system/atoms/badge/badge.types";

export function isBadgeAvatar<C extends ElementType>(badge: BadgePort<C>): badge is BadgeAvatarPort<C> {
  return (badge as BadgeAvatarPort<C>).avatar !== undefined;
}

export function isBadgeIcon<C extends ElementType>(badge: BadgePort<C>): badge is BadgeAvatarPort<C> {
  return (badge as BadgeIconPort<C>).icon !== undefined;
}

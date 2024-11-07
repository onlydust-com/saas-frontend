import { ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgePort } from "@/design-system/atoms/badge";
import { AvatarLabelGroupPort } from "@/design-system/molecules/avatar-label-group";

export interface CellBadgeProps {
  items: ReactNode[];
  badgeProps?: BadgePort<AnyType>;
  popOverAvatars?: AvatarLabelGroupPort<AnyType>["avatars"];
}

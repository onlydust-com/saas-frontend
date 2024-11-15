import { ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgePort } from "@/design-system/atoms/badge";

export interface CellBadgeProps {
  items: {
    content: ReactNode;
    badgeProps?: BadgePort<AnyType>;
  }[];
}

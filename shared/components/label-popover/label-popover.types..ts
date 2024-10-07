import { AnyType } from "@/core/kernel/types";

import { BadgePort } from "@/design-system/atoms/badge";

export interface LabelPopoverProps {
  labels: string[];
  badgeProps?: BadgePort<AnyType>;
}

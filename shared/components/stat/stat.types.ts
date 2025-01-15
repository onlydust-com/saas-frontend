import { ReactNode } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";

export interface StatProps {
  label: string;
  value: ReactNode;
  iconProps?: IconPort;
  badgeProps?: BadgePort<"span">;
}

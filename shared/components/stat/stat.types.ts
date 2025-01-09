import { ReactNode } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface StatProps {
  label: TranslateProps;
  value: ReactNode;
  iconProps?: IconPort;
  badgeProps?: BadgePort<"span">;
}

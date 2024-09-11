import { LucideIcon } from "lucide-react";

import { BadgePort } from "@/design-system/atoms/badge";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface TBadgeListProps {
  label: TranslateProps;
  icon: LucideIcon;
  items: Array<BadgePort<"div">>;
}

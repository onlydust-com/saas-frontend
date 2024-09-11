import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface TInfoDropdownProps {
  label: TranslateProps;
  icon?: IconPort;
  items: Array<BadgePort<"div">>;
}

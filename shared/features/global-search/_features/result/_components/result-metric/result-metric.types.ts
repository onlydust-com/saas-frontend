import { LucideIcon } from "lucide-react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface ResultMetricProps {
  icon: LucideIcon;
  count: number | string;
  label?: TranslateProps;
}

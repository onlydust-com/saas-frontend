import { LucideIcon } from "lucide-react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface ResultTemplateProps {
  name?: string;
  description?: string;
  type: "project" | "contributor";
  tags?: string[];
  metrics?: { icon: LucideIcon; count: number | string; label?: TranslateProps }[];
}

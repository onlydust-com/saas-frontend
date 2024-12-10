import { LucideIcon } from "lucide-react";

import { SearchRessourceType } from "@/core/domain/search/search-contract.types";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface ResultTemplateProps {
  name?: string;
  description?: string;
  type: SearchRessourceType;
  tags?: string[];
  metrics?: { icon: LucideIcon; count: number | string; label?: TranslateProps }[];
}

import { ReactNode } from "react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface TInfoDropdownProps {
  targetLabel: ReactNode;
  dropdownTitleToken: TranslateProps;
  links: { url?: string | null; value?: string }[];
}

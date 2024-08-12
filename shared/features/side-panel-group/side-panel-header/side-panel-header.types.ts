import { ReactNode } from "react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface SidePanelHeaderProps {
  asBackButton?: boolean;
  asCloseButton?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  title?: TranslateProps;
}

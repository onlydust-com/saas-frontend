import { ReactNode } from "react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface SidePanelHeaderProps {
  canClose?: boolean;
  canGoBack?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  title?: TranslateProps;
  onClose?: () => void;
}

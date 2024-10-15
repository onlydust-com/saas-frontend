import { ReactNode } from "react";

import { TypoPort } from "@/design-system/atoms/typo";

export interface SidePanelHeaderProps {
  canClose?: boolean;
  canGoBack?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  title?: TypoPort<"span">;
  titleEndContent?: ReactNode;
  onClose?: () => void;
  onBack?: () => void;
}

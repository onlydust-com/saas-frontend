import { ReactNode } from "react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

interface ClassNames {
  base: string;
  wrapper: string;
  thumb: string;
  label: string;
  startContent: string;
  endContent: string;
  thumbIcon: string;
}

export interface SwitchPort {
  classNames?: Partial<ClassNames>;
  onChange: (isActive: boolean) => void;
  isSelected: boolean;
  isDisabled?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  label?: TranslateProps;
  description?: TranslateProps;
}

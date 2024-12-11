import { HTMLProps } from "react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

interface Variants {
  variant?: "primary";
  isDisabled: boolean;
}

interface ClassNames {
  base: string;
  wrapper: string;
  icon: string;
}

interface DataAttributes {
  "data-focus"?: boolean;
}

export interface CheckboxPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  onChange?: (checked: boolean) => void;
  onNativeEventChange?: HTMLProps<HTMLInputElement>["onChange"];
  value?: boolean;
  isDisabled?: boolean;
  mixed?: boolean;
  label?: TranslateProps;
  description?: TranslateProps;
  attr?: DataAttributes;
}

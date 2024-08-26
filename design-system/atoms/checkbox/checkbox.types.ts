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

export interface CheckboxPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  onChange?: (checked: boolean) => void;
  value?: boolean;
  isDisabled?: boolean;
  mixed?: boolean;
  label?: TranslateProps;
  description?: TranslateProps;
}

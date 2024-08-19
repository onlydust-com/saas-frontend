import { ComponentPropsWithoutRef, ElementType } from "react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface EmptyStateProps<C extends ElementType> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  titleTranslate?: TranslateProps;
  descriptionTranslate?: TranslateProps;
  actionLabelTranslate?: TranslateProps;
  onAction?: () => void;
}

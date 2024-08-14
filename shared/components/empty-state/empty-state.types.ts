import { ElementType } from "react";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface EmptyStateProps {
  as?: ElementType;
  titleTranslate?: TranslateProps;
  descriptionTranslate?: TranslateProps;
  actionLabelTranslate?: TranslateProps;
  onAction?: () => void;
}

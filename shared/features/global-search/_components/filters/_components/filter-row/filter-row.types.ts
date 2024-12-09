import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface FilterRowProps {
  label: TranslateProps;
  icon: IconPort;
  children: ReactNode;
}

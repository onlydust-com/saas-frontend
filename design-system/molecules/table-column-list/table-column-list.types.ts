import { ListMenuPort } from "@/design-system/molecules/menu";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface TableColumnListPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  titleProps: TranslateProps;
  menuProps: ListMenuPort;
}

import { PropsWithChildren } from "react";

import { AccordionSinglePort } from "@/design-system/molecules/accordion";

interface ClassNames {
  container: string;
}

export interface AccordionFilterProps extends PropsWithChildren {
  selected?: number;
  name: string;
  title: AccordionSinglePort["titleProps"];
  classNames?: Partial<ClassNames>;
}

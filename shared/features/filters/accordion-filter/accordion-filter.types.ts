import { PropsWithChildren } from "react";

import { AccordionSinglePort } from "@/design-system/molecules/accordion";

export interface AccordionFilterProps extends PropsWithChildren {
  selected?: number;
  name: string;
  title: AccordionSinglePort["titleProps"];
}
